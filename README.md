# CampusConnect-API

## Routes
- LOGIN: http://localhost:PORT/api/auth/login (data: email, password, soc_flag: 1 if society account, 0 otherwise)
- SIGNUP: http://localhost:PORT/api/auth/signup (data: username, email, password)
- CHATROOMS:
    - CREATE: http://localhost:PORT/api/chatroom/create (data: s_id, name, description, icon)
    - GET: http://localhost:PORT/api/chatroom/get   (data: s_id)
    - MESSAGES:
        - SEND: http://localhost:PORT/api/chatroom/message/send (data: chat_id, s_id, content)
        - GET: http://localhost:PORT/api/chatroom/message/get (data: chat_id)
