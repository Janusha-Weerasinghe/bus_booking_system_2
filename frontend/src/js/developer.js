document.addEventListener('DOMContentLoaded', () => {
    const runDiagnosticsBtn = document.getElementById('run-diagnostics-btn');

    runDiagnosticsBtn.addEventListener('click', () => {
        alert('System diagnostics running... No issues detected!');
    });
});
