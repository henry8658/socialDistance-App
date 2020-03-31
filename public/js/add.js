const reportForm = document.getElementById('report-form');
const crowdedness = document.getElementById('crowdedness');
const location = document.getElementById('location');

// Send POST to API to add report
async function addReport(e) {
  e.preventDefault();

  if (crowdedness.value === '' || location.value === '') {
    alert('Please fill in fields');
  }

  const sendBody = {
    location: {
      coordinates : location.value
    },
    crowdedness: crowdedness.value
  };

  try {
    const res = await fetch('/report/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    alert('Reported!');
    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', addReport);