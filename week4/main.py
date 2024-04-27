from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from typing import Union
from fastapi import Form
from fastapi.responses import RedirectResponse
from typing import Annotated
from typing import Optional
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

# 添加 SessionMiddleware 中介軟體
app.add_middleware(SessionMiddleware, secret_key="iambettyhappy")

# 定義Middleware, 要放入BaseHTTPMiddleware
class MiddlewareSignin(BaseHTTPMiddleware):
    async def dispatch(self, request:Request, call_next):
        response = await call_next(request)
        session = request.session
        session["SING-IN"] = False
        print("default", request.session.get("SING-IN"))
        return response

# 添加自定義中介軟體到應用程式中
app.add_middleware(MiddlewareSignin)



# 連接到 static 資料夾
app.mount("/static", StaticFiles(directory="static"), name="static")

# 初始化模板引擎
templates = Jinja2Templates(directory="templates")
#app = FastAPI()


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

'''@app.post("/login")
async def verify(request: Request):
    account = "test"
    password = "1234"
    form_data = await request.form()
    login_account = form_data.get("account")
    login_passwd = form_data.get("password")

    if login_account == account and login_passwd == password:
        return{"correct": form_data.get("checkbox")}
    return{"wrong"}'''
@app.post("/signin")
async def login(request: Request, username: Optional[str] = Form(None), password: Optional[str] = Form(None)):
    usertest = "test"
    passwdtest = "1234"
    
    if username == None or password == None: ##empty
        message = "Please enter username and password"
        request.session["SING-IN"] = False
        return RedirectResponse(url=f"/error?message={message}", status_code=302)
        #message 拋到error 的query
    elif username == usertest and password == passwdtest:
        request.session["SING-IN"] = True
        print(request.session.get("SING-IN"))
        return RedirectResponse(url="/member", status_code=302) 
        ##這邊設定status_code 以後, 就可以拋到get member, 不然一值都在post member
    
    else:
        message = "Username or password is not correct"
        request.session["SING-IN"] = False
        return RedirectResponse(url=f"/error?message={message}", status_code=302)
    
  
@app.get("/member")
async def get_member_page(request: Request):
    print("member",request.session.get("SING-IN"))    
    if request.session.get("SING-IN") == True:
        return templates.TemplateResponse("member.html", {"request": request})
    else:
        return RedirectResponse(url="/") 

@app.get("/error")
async def error_page(request: Request, message: Union[str, None] = None):
    print(request.session.get("SING-IN"))
    if request.session.get("SING-IN")==False:
        return templates.TemplateResponse("error.html", {"request": request, "message":message})
    #message:message 要加進來, 才能用jinja2 template 引用message
    #Union[str, None] = None 表示message 可以是none 或者一個str, default = None
    #message 是一個query
#async 和request 是在幹嘛的?

@app.get("/signout")
def signout(request: Request):
    request.session["SING-IN"] = False
    return RedirectResponse(url="/") 

@app.get("/square/{number}")
async def square(number: int):
    square = number * number
    return {"square": square}



    

