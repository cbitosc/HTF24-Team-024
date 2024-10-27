import math
import json
from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore

def load_products(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)


def prepare_corpus(products):
    return [" ".join(product['tags']) for product in products]


def find_best_match(search_query, products):
    # Prepare the corpus (tags for each product)
    corpus = prepare_corpus(products)
    search_query = search_query.lower()

    search_query_size = len(search_query.split())

    # Add the search query to the corpus
    corpus.append(search_query)

    print("Corpus: \n")
    # for items in corpus:
    #     sentences += str(items)
    #     print(items, "\n")

    sentence = ""
    sentences = ["".join(word) for word in corpus]
    for items in sentences:
        sentence += str(items)

    word_corpus = sentence.split()
    #print(word_corpus)
    print(f"Length of corpus: {len(corpus)}")
    print(f"Length of word_corpus: {len(word_corpus)}")


    # Initialize TF-IDF Vectorizer
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)
    # tfidf_word_matrix = vectorizer.fit_transform(word_corpus)


    # print(tfidf_matrix)
    # print("\n")
    # print(tfidf_word_matrix)

    #print(f"The tfidf matrix: {tfidf_matrix}")

    # Compute cosine similarity between the search query and all product tags
    similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    # similarities_2 = cosine_similarity(tfidf_word_matrix[-search_query_size:], tfidf_word_matrix[:-search_query_size])
    # print(f"The similarities: {similarities_2}")

    # Get the product with the highest similarity score
    best_match_index = similarities.argmax()
    best_match_score = similarities[0, best_match_index]

    # argmax_imdex_for_similarities2 = 0
    # for i in range(0, 10):
    #     if similarities_2[i].any() > similarities_2[i+1].any():
    #         argmax_imdex_for_similarities2 = i
    #     else:
    #         argmax_imdex_for_similarities2 = i+1

    # print(argmax_imdex_for_similarities2)
    # best_match_score2 = similarities_2[0, argmax_imdex_for_similarities2]


    print(f"Best match index: {best_match_index}")
    # print(f"argmax_imdex_for_similarities2: {argmax_imdex_for_similarities2}\n")
    print(f"Best match score: {best_match_score}")
    # print(f"Best match score 2: {best_match_score2}")


    if best_match_score > 0:
        return products[best_match_index], best_match_score
    else:
        return None


def main():
    # Example user search query
    search_query = "I want an advanced mixed reality headset"

    # Load product data from the JSON file
    products = load_products('products.json')

    # Find the best matching product
    best_match, score = find_best_match(search_query, products)

    # Display the result
    if best_match:
        print(f"\nBest Match Found: {best_match['name']} (ID: {best_match['id']})")
        print(f"Similarity Score: {score:.2f}")
    else:
        print("No matching product found.")


# Run the search
if __name__ == "__main__":
    main()
