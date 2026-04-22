# 🎓 Student Performance Predictor

A **Machine Learning-based web application** that predicts student performance using academic and behavioral features, with real-time visualization and grade calculation.

---

## 📂 Project Structure

```
Student_Performance_Predictor/
├── Backend/
│   ├── app.py
│   ├── train_model.py
│   ├── generate_dataset.py
│   ├── model_testing.ipynb
│   ├── student_performance_dataset.csv
│   └── requirements.txt
│
├── HTML/
├── CSS/
├── JS/
│
├── README.md
└── .gitignore
```

---

## 🎯 About

The Student Performance Predictor is designed to analyze multiple aspects of a student’s academic life and estimate their final performance.

It integrates:

* A **regression-based ML model (Random Forest)**
* A **Flask backend for prediction**
* A **web interface for user interaction and visualization**

The system not only predicts marks but also provides insights into how different factors influence performance.

---

## ✨ Features

* 🔮 Predicts end-semester marks (0–50)
* 🧮 Calculates total marks and assigns grade automatically
* 📊 Visualizes input features using interactive charts
* 🧠 Uses machine learning for prediction
* ⚡ Fast and responsive user interface
* 🔁 Fully reproducible pipeline (dataset → training → prediction)

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript
* **Backend:** Python, Flask
* **Machine Learning:**

  * Regression Model (**Random Forest Regressor**)
  * Feature Scaling (StandardScaler)
* **Libraries:** Pandas, NumPy, Scikit-learn
* **Visualization:** Chart.js

---

## 🧮 Algorithm & Approach

The system uses a **supervised regression approach**:

### 1️⃣ Feature Representation

Each student is represented using 12 input parameters covering academic, behavioral, and demographic aspects.

---

### 2️⃣ Model: Random Forest Regressor 🌲

* Builds multiple decision trees
* Trains on random subsets
* Final prediction = average of all trees

✔ Handles non-linear relationships
✔ Reduces overfitting
✔ Works well with mixed features

---

### 3️⃣ Training Process

* Dataset generated using `generate_dataset.py`
* Features scaled using StandardScaler
* Model trained and evaluated using **R² score (train & test)**

---

### 4️⃣ Prediction Flow

```
Input → Scaling → Model → Predicted End-Sem Marks
```

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

* Range: **0–50**

### 🧮 Total Marks

```
Total = Internal + Mid-Sem + Predicted End-Sem
```

### 🏆 Grade System

| Grade | Marks  |
| ----- | ------ |
| O     | 90–100 |
| E     | 80–89  |
| A     | 70–79  |
| B     | 60–69  |
| C     | 50–59  |
| D     | 40–49  |
| F     | < 40   |

---

### 📊 Visualization

* Bar chart of input features
* Helps understand performance influence

---

## ⚙️ Setup & Usage

### Install Dependencies

```
pip install -r Backend/requirements.txt
```

### Generate Dataset

```
python Backend/generate_dataset.py
```

### Train Model

```
python Backend/train_model.py
```

* Displays **R² scores**
* Generates `model.pkl`, `scaler.pkl`

### Run Backend

```
python Backend/app.py
```

### Run Frontend

Open:

```
HTML/index.html
```

or:

```
python -m http.server 8080
```

---

## ⚠️ Notes

* `.pkl` files are not included (generated locally)
* Dataset is synthetic
* Grade calculation is rule-based

---

## 🔮 Future Enhancements

* [ ] Deploy project online
* [ ] Improve model accuracy
* [ ] Add authentication
* [ ] Use real-world dataset

---

## 📧 Contact

**Fida Hussain**

* LinkedIn: https://www.linkedin.com/in/fida-hussain-38511a2a6
* GitHub: https://github.com/Fida1343
* Email: [fidahussain70040@gmail.com](mailto:fidahussain70040@gmail.com)

---

**Made with ❤️ by Fida Hussain**
