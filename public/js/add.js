const reportForm = document.getElementById('report-form');
const crowdedness = document.getElementById('report-crowdedness');
const reportAddress = document.getElementById('report-location');

// Send POST to API to add 
async function addReport(e) {
  e.preventDefault();

  if (crowdedness.value === '' || reportAddress.value === '') {
    alert('Please fill in fields');
  }

  const sendBody = {
    crowdedness: crowdedness.value,
    address: reportAddress.value
  };

  try {
    const res = await fetch('/api/v1/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Server error!');
    }

    alert('Report added!');
    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

reportForm.addEventListener('submit', addReport);