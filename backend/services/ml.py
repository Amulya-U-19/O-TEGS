from sklearn.linear_model import LogisticRegression

def train(ai, student):
    model = LogisticRegression()
    model.fit(ai, student)
    return model