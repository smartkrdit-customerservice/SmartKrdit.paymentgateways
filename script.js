let currentStep = 1;

// Sembur/Paparkan Pop-up automatik
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fraudPopup').style.display = 'flex';
    // Jika mahu tambah mesej khusus SmartKrdit, boleh tambah di sini.
});

function closePopup() {
    document.getElementById('fraudPopup').style.display = 'none';
    // Jika mahu log/trigger event dengan nama SmartKrdit, boleh tambah.
}

function updateProgressBar(step) {
    document.querySelectorAll('.progress-item').forEach((el, index) => {
        if (index + 1 <= step) el.classList.add('active');
        else el.classList.remove('active');
    });
    document.getElementById('progressLine').style.width = ((step - 1) / 3) * 100 + '%';
}

function goToStep2() {
    const name = document.getElementById('fullname').value.trim();
    const ic = document.getElementById('icnumber').value.trim();
    const appid = document.getElementById('appid').value.trim();
    const amount = document.getElementById('amount').value.trim();

    // Validasi borang input
    if (!name || !ic || !appid || !amount) {
        alert('⚠️ Sila lengkapkan semua ruangan maklumat bertanda (*) sebelum meneruskan.');
        return;
    }

    if(ic.length < 12) {
        alert('⚠️ Sila pastikan Nombor IC mengandungi 12 digit tanpa tanda (-) .');
        return;
    }

    // Kemas kini teks paparan di Langkah Seterusnya
    document.getElementById('displayAmount').innerText = parseFloat(amount).toFixed(2);
    document.getElementById('displayAppId').innerText = appid;
    document.getElementById('displayCustomerName').innerText = name;
    document.getElementById('displayFinalAppId').innerText = appid;

    currentStep = 2;
    showStep(currentStep);
}

function nextStep(step) {
    currentStep = step;
    showStep(currentStep);
}

function prevStep(step) {
    currentStep = step;
    showStep(currentStep);
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    updateProgressBar(step);
}

function fileSelected() {
    const file = document.getElementById('receiptFile').files[0];
    if (file) {
        document.getElementById('uploadStatus').innerHTML = `✅ <b>Terpilih:</b> ${file.name}`;
    }
}

function submitReceipt() {
    const file = document.getElementById('receiptFile').files[0];
    if (!file) {
        alert('⚠️ Sila muat naik bukti resit pembayaran anda terlebih dahulu.');
        return;
    }
    
    // Berjaya, terus pergi ke skrin pengesahan selesai
    currentStep = 4;
    showStep(currentStep);
}

function resetForm() {
    document.getElementById('fullname').value = '';
    document.getElementById('icnumber').value = '';
    document.getElementById('appid').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('receiptFile').value = '';
    document.getElementById('uploadStatus').innerText = 'Klik di sini untuk pilih resit';
    currentStep = 1;
    showStep(currentStep);
}
