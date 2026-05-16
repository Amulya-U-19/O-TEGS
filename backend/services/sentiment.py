def simple_sentiment(text):
    positive = ["good", "great", "excellent", "clear"]
    negative = ["bad", "confusing", "poor"]

    score = 0
    text = str(text).lower()

    for word in positive:
        if word in text:
            score += 1

    for word in negative:
        if word in text:
            score -= 1

    return score