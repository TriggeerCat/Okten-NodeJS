db.createUser({
    user: "admin",
    pwd: "verysecretpassword",
    roles: [
        {
            role: "readWrite",
            db: "database"
        }
    ]
});
