# 🎓 Student Performance Predictor (ML + Web Application)

## 📌 Overview

The **Student Performance Predictor** is a full-stack Machine Learning web application designed to intelligently estimate a student's academic outcome based on behavioral, academic, and lifestyle factors.

By combining a **regression-based ML model** with an interactive web interface, the system provides:

- Accurate prediction of end-semester marks
- Insight into contributing factors through visualization
- Automated grade calculation based on academic rules

This project demonstrates the complete lifecycle of an ML system — from **data generation and model training to real-time deployment in a web application**.

---

## 🚀 Key Features

- 🔮 Predicts end-semester marks (out of 50)
- 🧠 ML model trained on multi-factor student dataset
- 📊 Visual representation of input features
- 🧮 Automatic total marks & grade calculation
- ⚙️ End-to-end pipeline: data → train → test → predict
- 🔁 Fully reproducible (dataset + model can be regenerated)

---

## 🛠️ Tech Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Frontend         | HTML5, CSS3, JavaScript          |
| Backend          | Python, Flask                    |
| Machine Learning | Regression Model (Random Forest) |
| Visualization    | Chart.js                         |
| Libraries        | Pandas, NumPy, Scikit-learn      |

---

## 🤖 Why Random Forest?

The project uses a **Random Forest Regressor** due to:

- 🌲 Handles **non-linear relationships** between features effectively
- 🛡️ Reduces overfitting through ensemble learning
- ⚖️ Works well with mixed-type features (academic + behavioral)
- 📈 Provides stable and reliable predictions without heavy tuning
- 🚀 Performs well even on synthetic datasets

---

## 📂 Project Structure

```id="p1r9k2"
project-root/
│
├── Backend/
│   ├── app.py
│   ├── train_model.py
│   ├── generate_dataset.py
│   ├── model_testing.ipynb
│   ├── student_performance_dataset.csv
│   ├── requirements.txt
│
├── HTML/
├── CSS/
├── JS/
│
├── README.md
├── .gitignore
```

---

## ⚙️ Setup, Training & Running the Project

### 1️⃣ Clone the Repository

```bash id="w8k2m1"
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

---

### 2️⃣ Install Backend Dependencies

```bash id="h2n4c7"
pip install -r Backend/requirements.txt
```

---

### 3️⃣ Generate Dataset

```bash id="n7d3x5"
python Backend/generate_dataset.py
```

- Creates a synthetic dataset simulating student behavior
- Saved as `student_performance_dataset.csv`

---

### 4️⃣ Train the Model

```bash id="q9z6r2"
python Backend/train_model.py
```

This step:

- Applies preprocessing and feature scaling
- Trains the regression model
- Evaluates performance using **R² score (training & testing)**
- Saves trained artifacts:
  - `model.pkl`
  - `scaler.pkl`

---

### 5️⃣ Run Backend Server

```bash id="v3l8t1"
python Backend/app.py
```

Backend runs at:

```id="b4x6y2"
http://127.0.0.1:5000/
```

---

### 6️⃣ Run Frontend

Open directly in browser:

```id="k8p2r9"
HTML/index.html
```

Or use a local server:

```bash id="t1m5q7"
python -m http.server 8080
```

Then open:

```id="z4n7s3"
http://localhost:8080/HTML/index.html
```

---

## 🧠 Machine Learning Pipeline

1. **Dataset Generation**
   - Synthetic dataset created using controlled distributions

2. **Data Preprocessing**
   - Feature selection and scaling

3. **Model Training**
   - Regression model trained on processed dataset

4. **Model Evaluation**
   - Performance validated using R² score

5. **Prediction Flow**
   - Input → Scaling → Model → Output

---

## 📊 Input Features

| Feature               | Range     |
| --------------------- | --------- |
| Attendance            | 0–100     |
| Study Hours           | 0–12      |
| Previous CGPA         | 0–10      |
| Internal Marks        | 0–30      |
| Mid-Sem Marks         | 0–20      |
| Backlogs              | 0–5+      |
| Assignment Completion | 0–100     |
| Class Participation   | 1–5       |
| Age                   | 17–30     |
| Gender                | 0 / 1 / 2 |
| Extra Curricular      | 1–5       |
| Late Night Entry      | 1–5       |

---

## 📈 Output

### 🎯 Predicted End-Sem Marks

- Range: **0–50**

### 🧮 Total Marks

```id="m6x2c8"
Total = Internal + Mid-Sem + Predicted End-Sem
```

### 🏆 Grade Assignment

| Grade | Marks  |
| ----- | ------ |
| O     | 90–100 |
| E     | 80–89  |
| A     | 70–79  |
| B     | 60–69  |
| C     | 50–59  |
| D     | 40–49  |
| F     | < 40   |

### 📊 Visualization

- Bar chart representing input features
- Helps interpret student performance patterns

---

## ⚠️ Important Notes

- `.pkl` files are excluded from version control
- Model must be trained locally before running
- Dataset is synthetic and used for demonstration

---

## 🧪 Testing

- Model behavior verified using `model_testing.ipynb`
- Ensures prediction consistency and correctness

---

## 💡 Future Enhancements

- Cloud deployment(Render / AWS)
- Advanced ML models
- Add authentication system
- Improve model accuracy
- Improved UI/UX
- Real-world dataset integration

---

## 👨‍💻 Author

**Fida Hussain**
CSE, KIIT Bhubaneswar

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐
