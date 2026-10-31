from database import Base
from sqlalchemy import Column, Integer, String

class ToDo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String)
    completion = Column(String)
    date = Column(String)