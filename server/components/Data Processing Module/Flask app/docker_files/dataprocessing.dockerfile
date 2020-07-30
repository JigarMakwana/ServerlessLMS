FROM python:latest
COPY ./app.py ./
COPY ./requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 8080
ENTRYPOINT [ "python", "app.py" ]
