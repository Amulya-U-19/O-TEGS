from vosk import Model, KaldiRecognizer
import wave, json

model = Model("models/vosk-model-small-en-us-0.15")

def transcribe(audio):
    wf = wave.open(audio, "rb")
    rec = KaldiRecognizer(model, wf.getframerate())

    text = ""

    while True:
        data = wf.readframes(4000)
        if not data:
            break
        if rec.AcceptWaveform(data):
            text += json.loads(rec.Result())["text"] + " "

    return text