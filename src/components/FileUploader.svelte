<script lang="ts">
	import { fly, fade } from "svelte/transition";
	let files: FileList | null = null;
	let fileSend = false;
	console.log(process.env.BASEURL);
	$: if (files) {
		console.log(files);
		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}

	async function handleSubmit(e: Event) {
		const url = `${process.env.BASEURL}/fileupload`;

		const formData = new FormData();
		formData.append("file", files[0]);

		const response = await fetch(url, {
			method: "Post",
			body: formData,
		});
		const responsejson = await response.json();

		if (response.ok) {
			console.log(response);
			e.target[0].value = "";
			fileSend = true;

			console.table(responsejson);
			setTimeout(() => {
				fileSend = false;
			}, 3000);
		} else {
			console.log(responsejson);
		}
	}
</script>

<main>
	{#if fileSend}
		<h1 transition:fade={{ duration: 150 }}>File send successfully</h1>
	{/if}
	<form id="sendFile" on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<label for="file">Upload a file:</label>
			<input
				type="file"
				bind:files
				name="file"
				id="file"
				accept=".csv, text/plain"
				required
			/>
		</div>
		<button class="btn btn-full">Send file</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: 100;
	}
	.btn.btn-full {
		border-radius: 3px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
