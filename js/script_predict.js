const API_URL = 'http://localhost:5000/predict';

const VALIDATION_RULES = {
    attendance:            { min: 0,  max: 100, name: 'Attendance' },
    study_hours:           { min: 0,  max: 12,  name: 'Study Hours' },
    previous_cgpa:         { min: 0,  max: 10,  name: 'Previous CGPA' },
    internal_marks:        { min: 0,  max: 30,  name: 'Internal Marks' },
    midsem_marks:          { min: 0,  max: 20,  name: 'Mid-Semester Marks' },
    backlogs:              { min: 0,  max: 5,   name: 'Backlogs' },
    assignment_completion: { min: 0,  max: 100, name: 'Assignment Completion' },
    class_participation:   { min: 1,  max: 5,   name: 'Class Participation' },
    age:                   { min: 17, max: 30,  name: 'Age' },
    late_night_entry:      { min: 1,  max: 5,   name: 'Late Night Entry' }
};

function showPopup(message) {
    let popup = document.getElementById('validationPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'validationPopup';
        popup.className = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>⚠️ Validation Error</h3>
                <p id="popupMessage"></p>
                <button class="popup-btn" onclick="closePopup()">OK</button>
            </div>
        `;
        document.body.appendChild(popup);
    }
    document.getElementById('popupMessage').textContent = message;
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('validationPopup');
    if (popup) popup.classList.remove('show');
}

function validateInputs(formData) {
    for (let [fieldName, rules] of Object.entries(VALIDATION_RULES)) {
        const value = formData.get(fieldName);
        if (!value && value !== 0 && value !== '0') {
            showPopup(`Please fill in ${rules.name}`);
            return false;
        }
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            showPopup(`${rules.name} must be a valid number`);
            return false;
        }
        if (numValue < rules.min || numValue > rules.max) {
            showPopup(`${rules.name} must be between ${rules.min} and ${rules.max}`);
            return false;
        }
    }
    if (!formData.get('sex')) {
        showPopup('Please select Gender');
        return false;
    }
    if (!formData.get('extra_curricular')) {
        showPopup('Please select Extra-Curricular Activities');
        return false;
    }
    return true;
}

function nextSection(sectionNum) {
    const currentSection = document.querySelector('.form-section.active');
    const inputs = currentSection.querySelectorAll('input[required], select[required]');

    for (let input of inputs) {
        if (!input.value && input.value !== '0') {
            showPopup('Please fill in all required fields before proceeding');
            input.focus();
            return;
        }
        if (input.type === 'number' && VALIDATION_RULES[input.name]) {
            const rules = VALIDATION_RULES[input.name];
            const numValue = parseFloat(input.value);
            if (numValue < rules.min || numValue > rules.max) {
                showPopup(`${rules.name} must be between ${rules.min} and ${rules.max}`);
                input.focus();
                return;
            }
        }
    }

    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section${sectionNum}`).classList.add('active');

    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index < sectionNum);
    });

    if (sectionNum === 3) populateReviewData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection(sectionNum) {
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section${sectionNum}`).classList.add('active');

    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index < sectionNum);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateReviewData() {
    const formData = new FormData(document.getElementById('predictionForm'));

    const academicFields = {
        attendance:            'Attendance (%)',
        study_hours:           'Study Hours/Day',
        previous_cgpa:         'Previous CGPA',
        internal_marks:        'Internal Marks (/30)',
        midsem_marks:          'Mid-Semester Marks (/20)',
        backlogs:              'Backlogs',
        assignment_completion: 'Assignment Completion (%)',
        class_participation:   'Class Participation (1–5)'
    };

    const personalFields = {
        age:              'Age',
        sex:              'Gender',
        extra_curricular: 'Extra-Curricular',
        late_night_entry: 'Late-Night Entry (1–5)'
    };

    function buildGrid(fields) {
        return Object.entries(fields).map(([key, label]) => `
            <div class="review-item">
                <div class="review-label">${label}</div>
                <div class="review-value">${formData.get(key)}</div>
            </div>
        `).join('');
    }

    document.getElementById('reviewData').innerHTML = `
        <div class="review-section">
            <h3>📚 Academic Information</h3>
            <div class="review-grid">${buildGrid(academicFields)}</div>
        </div>
        <div class="review-section">
            <h3>👤 Personal Information</h3>
            <div class="review-grid">${buildGrid(personalFields)}</div>
        </div>
    `;
}

const predictionForm = document.getElementById('predictionForm');
if (predictionForm) {
    predictionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!validateInputs(formData)) return;

        document.getElementById('loading').classList.add('show');
        document.querySelector('.btn-predict').disabled = true;

        const data = {
            attendance:            parseFloat(formData.get('attendance')),
            study_hours:           parseFloat(formData.get('study_hours')),
            previous_cgpa:         parseFloat(formData.get('previous_cgpa')),
            internal_marks:        parseFloat(formData.get('internal_marks')),
            midsem_marks:          parseFloat(formData.get('midsem_marks')),
            backlogs:              parseInt(formData.get('backlogs')),
            assignment_completion: parseFloat(formData.get('assignment_completion')),
            class_participation:   parseInt(formData.get('class_participation')),
            age:                   parseInt(formData.get('age')),
            sex:                   formData.get('sex'),
            extra_curricular:      formData.get('extra_curricular'),
            late_night_entry:      parseInt(formData.get('late_night_entry'))
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            document.getElementById('loading').classList.remove('show');
            document.querySelector('.btn-predict').disabled = false;

            if (result.success) {
                sessionStorage.setItem('predictionResults', JSON.stringify(result));
                sessionStorage.setItem('inputData', JSON.stringify(data));
                window.location.href = 'result.html';
            } else {
                showPopup(`Prediction failed: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            document.getElementById('loading').classList.remove('show');
            document.querySelector('.btn-predict').disabled = false;
            showPopup(`Could not reach the server. Make sure the backend is running on http://localhost:5000`);
        }
    });
}