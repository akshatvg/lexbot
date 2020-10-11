We built an extractive chatbot which is powererd by a BERT question answering modelling running in the backend.
Our model is in onnx format which allows it to run very efficiently on CPU. (Inference time 252 ms). We build context for the tabular data using 
natural language processing, this context allows us to have multi-turn dialogues without having to use some complex dialog managment system

The whole backend is deployed on FastAPI which gives performance at par with Golang. 