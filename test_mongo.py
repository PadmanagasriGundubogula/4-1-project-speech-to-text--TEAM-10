import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def test_mongo():
    try:
        client = AsyncIOMotorClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000)
        print("Attempting to connect to MongoDB...")
        await client.admin.command('ping')
        print("MongoDB connection SUCCESS")
    except Exception as e:
        print(f"MongoDB connection FAILED: {e}")

if __name__ == "__main__":
    asyncio.run(test_mongo())
