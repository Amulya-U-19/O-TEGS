import chromadb

client = chromadb.Client()
collection = client.get_or_create_collection("lectures")

def store_chunks(chunks):
    for i, c in enumerate(chunks):
        collection.add(documents=[c], ids=[str(i)])

def query_chunks(q):
    return collection.query(query_texts=[q], n_results=5)