import pandas as pd
import numpy as np

np.random.seed(42)
rows = 10000
data = {
    "Attendance": np.random.uniform(40, 100, rows),
    "Study_Hours": np.random.uniform(0, 10, rows),
    "Previous_CGPA": np.random.uniform(4, 10, rows),
    "Internal_Marks": np.random.uniform(5, 30, rows),
    "Midsem_Marks": np.random.uniform(5, 20, rows),
    "Backlogs": np.random.randint(0, 6, rows),
    "Assignment_Completion": np.random.uniform(40, 100, rows),
    "Class_Participation": np.random.randint(1, 6, rows),
    "Age": np.random.randint(18, 26, rows),
    "Sex": np.random.randint(0, 3, rows),  # 0=M,1=F,2=O
    "Extra_Curricular": np.random.randint(0, 2, rows),
    "Late_Night_Entry": np.random.randint(1, 6, rows)
}
df = pd.DataFrame(data)

# Generate End-Sem Marks (0–50)
raw_score = (
    0.25 * df["Attendance"] / 2 +
    0.30 * df["Previous_CGPA"] * 2 +
    0.20 * df["Study_Hours"] * 2 +
    0.15 * df["Assignment_Completion"] / 2 +
    0.10 * df["Class_Participation"] * 5 -
    3 * df["Backlogs"] -
    2 * df["Late_Night_Entry"]
)

#Scale to 0–50
df["Endsem_Marks"] = (
    (raw_score - raw_score.min()) /
    (raw_score.max() - raw_score.min())
) * 50

#Add realistic noise
noise = np.random.normal(0, 2.0, size=len(df))  # std deviation = 2 marks
df["Endsem_Marks"] = df["Endsem_Marks"] + noise

#Clip to valid range
df["Endsem_Marks"] = df["Endsem_Marks"].clip(0, 50)
df.to_csv("student_performance_dataset.csv", index=False)

print("✅ Dataset saved as student_performance_dataset.csv")