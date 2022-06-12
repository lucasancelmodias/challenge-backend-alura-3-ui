<script lang="ts">
	import { fade } from "svelte/transition";
	import { sendFile } from "../stores/fileStore";
	import Transactions from "../components/Transactions.svelte";

	let files: FileList;
	let fileSend = false;
	let fileSendError = { error: false, message: "" };
	let transactionsComponent: Transactions;
	async function handleSubmit(e: Event) {
		const formData = new FormData();

		if (files[0]) {
			formData.append("file", files[0]);
		}

		const { data, error } = await sendFile(formData);

		if (error) {
			fileSendError = { error: true, message: data.message };
			setTimeout(() => {
				fileSendError = { error: false, message: "" };
			}, 3000);
		} else {
			fileSend = true;
			transactionsComponent.updateTransactions();
			setTimeout(() => {
				fileSend = false;
			}, 3000);
		}
		(e.target as HTMLFormElement).reset();
	}
</script>

<div>
	<h1 class="import-title">Importar transações</h1>
	<main>
		{#if fileSend}
			<h1 class="file-sent" transition:fade={{ duration: 150 }}>File send successfully</h1>
		{/if}

		{#if fileSendError.error}
			<div transition:fade={{ duration: 150 }}>
				<h1>File send error</h1>
				<p>{fileSendError.message}</p>
			</div>
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
					placeholder="Upload a file"
				/>
			</div>
			<button class="btn btn-full">Send file</button>
		</form>
	</main>
	<Transactions bind:this={transactionsComponent} />
</div>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1.import-title {
		text-align: center;
	}

	h1.file-sent {
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
