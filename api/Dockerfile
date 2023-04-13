FROM python:3.9.6
ENV PYTHONUNBUFFERED 1
WORKDIR /api
EXPOSE 80
COPY requirements.txt ./
RUN pip install -r requirements.txt
ADD api ./api
ADD ether_luxe ./ether_luxe
ADD entrypoint_api.sh ./entrypoint_api.sh
ADD manage.py ./manage.py
