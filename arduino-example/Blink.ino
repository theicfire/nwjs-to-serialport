char buffer[32];
int idx = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Start");
  buffer[0] = 'q';
}

void loop() {
  while (Serial.available() > 0) {
    char received = Serial.read();
    if (received == '\n') {
      buffer[idx] = '\0';
      idx = 0;
      Serial.println(buffer);
    } else {
      buffer[idx++] = received;
    }
  }
}
