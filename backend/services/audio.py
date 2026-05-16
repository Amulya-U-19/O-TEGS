from moviepy.editor import VideoFileClip

def extract_audio(video, audio):
    clip = VideoFileClip(video)
    clip.audio.write_audiofile(audio)