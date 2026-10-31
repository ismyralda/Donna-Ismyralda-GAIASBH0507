(() => {
  // Change this if your FastAPI server runs elsewhere.
  const API_URL = "http://127.0.0.1:8000/analyze-image";

  const ALLOWED_TYPES = ["image/jpeg", "image/png"];
  const MAX_BYTES = 10_000_000; // matches the server limit
  const TIMEOUT_MS = 90_000;

  const $ = (id) => document.getElementById(id);
  const dropzone = $("dropzone");
  const fileInput = $("file-input");
  const dropHint = $("drop-hint");
  const preview = $("preview");
  const fileMeta = $("file-meta");
  const analyzeBtn = $("analyze-btn");
  const resetBtn = $("reset-btn");
  const errorBox = $("error");
  const resultEmpty = $("result-empty");
  const resultLoading = $("result-loading");
  const resultEl = $("result");
  const resultNote = $("result-note");

  let selectedFile = null;
  let previewUrl = null;

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }
  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  function setResultState(state) {
    resultEmpty.hidden = state !== "empty";
    resultLoading.hidden = state !== "loading";
    resultEl.hidden = state !== "result";
    resultNote.hidden = state !== "result";
  }

  function formatSize(bytes) {
    return bytes < 1_000_000
      ? `${(bytes / 1000).toFixed(0)} KB`
      : `${(bytes / 1_000_000).toFixed(1)} MB`;
  }

  function validate(file) {
    if (!ALLOWED_TYPES.includes(file.type)) return "Only JPEG and PNG images are allowed.";
    if (file.size > MAX_BYTES) return "File is too large. Maximum size is 10 MB.";
    return null;
  }

  function selectFile(file) {
    clearError();
    const problem = validate(file);
    if (problem) {
      showError(problem);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    selectedFile = file;
    previewUrl = URL.createObjectURL(file);
    preview.src = previewUrl;
    preview.hidden = false;
    dropHint.hidden = true;
    dropzone.classList.add("has-image");
    fileMeta.textContent = `${file.name} (${formatSize(file.size)})`;
    fileMeta.hidden = false;
    analyzeBtn.disabled = false;
    resetBtn.hidden = false;
    setResultState("empty");
  }

  function reset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    selectedFile = null;
    fileInput.value = "";
    preview.hidden = true;
    preview.removeAttribute("src");
    dropHint.hidden = false;
    dropzone.classList.remove("has-image");
    fileMeta.hidden = true;
    analyzeBtn.disabled = true;
    resetBtn.hidden = true;
    clearError();
    setResultState("empty");
  }

  function renderAnalysis(text) {
    if (window.marked && window.DOMPurify) {
      // Sanitize because the text comes from a model, not from us.
      resultEl.innerHTML = DOMPurify.sanitize(marked.parse(text));
    } else {
      resultEl.textContent = text;
      resultEl.style.whiteSpace = "pre-wrap";
    }
    setResultState("result");
  }

  async function analyze() {
    if (!selectedFile) return;
    clearError();
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";
    setResultState("loading");

    const form = new FormData();
    form.append("file", selectedFile);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: form,
        signal: controller.signal,
      });
      let data = null;
      try { data = await res.json(); } catch { /* non-JSON body */ }

      if (!res.ok) {
        throw new Error(data?.detail || `Request failed (${res.status}).`);
      }
      if (!data?.analysis) throw new Error("The server returned an empty analysis.");
      renderAnalysis(data.analysis);
    } catch (err) {
      setResultState("empty");
      if (err.name === "AbortError") {
        showError("The request timed out. Please try again.");
      } else if (err instanceof TypeError) {
        showError(
          "Could not reach the server. Check that it is running at " + API_URL +
          " and that CORS is enabled for this page's origin."
        );
      } else {
        showError(err.message);
      }
    } finally {
      clearTimeout(timer);
      analyzeBtn.textContent = "Analyze";
      analyzeBtn.disabled = !selectedFile;
    }
  }

  // Events
  dropzone.addEventListener("click", () => {
    if (!dropzone.classList.contains("has-image")) fileInput.click();
  });
  dropzone.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && !dropzone.classList.contains("has-image")) {
      e.preventDefault();
      fileInput.click();
    }
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) selectFile(fileInput.files[0]);
  });

  ["dragenter", "dragover"].forEach((t) =>
    dropzone.addEventListener(t, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    })
  );
  ["dragleave", "drop"].forEach((t) =>
    dropzone.addEventListener(t, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    })
  );
  dropzone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files[0];
    if (file) selectFile(file);
  });

  analyzeBtn.addEventListener("click", analyze);
  resetBtn.addEventListener("click", reset);

  setResultState("empty");
})();
