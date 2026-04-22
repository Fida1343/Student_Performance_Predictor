function displayResults() {
    const resultsData = sessionStorage.getItem('predictionResults');
    const inputData = sessionStorage.getItem('inputData');

    if (!resultsData || !inputData) {
        alert('No prediction data found. Please make a prediction first.');
        window.location.href = 'predict.html';
        return;
    }

    const results = JSON.parse(resultsData);
    const inputs = JSON.parse(inputData);

    document.getElementById('predictedMarks').textContent = results.predicted_endsem_marks.toFixed(2);
    document.getElementById('midsemMarks').textContent = inputs.midsem_marks.toFixed(1);
    document.getElementById('internalMarks').textContent = inputs.internal_marks.toFixed(1);
    document.getElementById('endsemMarks').textContent = results.predicted_endsem_marks.toFixed(2);
    document.getElementById('totalMarks').textContent = results.total_marks.toFixed(2);

    const gradeBadge = document.getElementById('gradeBadge');
    gradeBadge.textContent = results.grade;
    gradeBadge.className = 'grade-badge grade-' + results.grade;

    createContributionChart(inputs);
    populateInputSummary(inputs);
}

function createContributionChart(inputs) {
    const ctx = document.getElementById('contributionChart');
    if (!ctx) return;

    const chartData = {
        'Attendance':       inputs.attendance,
        'Study Hours':      (inputs.study_hours / 12) * 100,
        'Previous CGPA':    (inputs.previous_cgpa / 10) * 100,
        'Internal Marks':   (inputs.internal_marks / 30) * 100,
        'Midsem Marks':     (inputs.midsem_marks / 20) * 100,
        'Assignment':       inputs.assignment_completion,
        'Participation':    (inputs.class_participation / 5) * 100,
        'Backlogs Impact':  Math.max(0, 100 - (inputs.backlogs * 20))
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(chartData),
            datasets: [{
                label: 'Performance Score (%)',
                data: Object.values(chartData),
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(72, 187, 120, 0.8)',
                    'rgba(66, 153, 225, 0.8)',
                    'rgba(237, 137, 54, 0.8)',
                    'rgba(246, 173, 85, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(252, 129, 129, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(72, 187, 120, 1)',
                    'rgba(66, 153, 225, 1)',
                    'rgba(237, 137, 54, 1)',
                    'rgba(246, 173, 85, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(252, 129, 129, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { callback: value => value + '%' }
                }
            }
        }
    });
}

function populateInputSummary(inputs) {
    const tableBody = document.getElementById('inputSummaryTable');
    if (!tableBody) return;

    const fields = [
        { name: 'Attendance',            value: inputs.attendance + '%',              category: 'Academic' },
        { name: 'Study Hours/Day',        value: inputs.study_hours,                  category: 'Academic' },
        { name: 'Previous CGPA',          value: inputs.previous_cgpa,               category: 'Academic' },
        { name: 'Internal Marks',         value: inputs.internal_marks + '/30',       category: 'Academic' },
        { name: 'Mid-Semester Marks',     value: inputs.midsem_marks + '/20',         category: 'Academic' },
        { name: 'Backlogs',               value: inputs.backlogs,                     category: 'Academic' },
        { name: 'Assignment Completion',  value: inputs.assignment_completion + '%',  category: 'Academic' },
        { name: 'Class Participation',    value: inputs.class_participation + '/5',   category: 'Academic' },
        { name: 'Age',                    value: inputs.age,                          category: 'Demographic' },
        { name: 'Gender',                 value: inputs.sex,                          category: 'Demographic' },
        { name: 'Extra-Curricular',       value: inputs.extra_curricular,             category: 'Behavioral' },
        { name: 'Late-Night Entry',       value: inputs.late_night_entry + '/5',      category: 'Behavioral' }
    ];

    const categoryStyle = 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem;';

    tableBody.innerHTML = fields.map(f => `
        <tr>
            <td><strong>${f.name}</strong></td>
            <td>${f.value}</td>
            <td><span style="${categoryStyle}">${f.category}</span></td>
        </tr>
    `).join('');
}