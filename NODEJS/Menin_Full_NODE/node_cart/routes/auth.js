const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { Router } = require("express");
const router = Router();

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
    });
});

router.get("/logout", async (req, res) => {
    //Очистка сессии
    req.session.destroy(() => {
        res.redirect("/auth/login#login");
    });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const candidate = await User.findOne({ email });
        console.log("-> candidate", candidate);

        if (candidate) {
            const areSame =
                password ===
                (await bcrypt.compare(password, candidate.password));

            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save((err) => {
                    if (err) {
                        throw err;
                    }
                    res.redirect("/");
                });
            } else {
                res.redirect("/auth/login#login");
            }
        } else {
            res.redirect("/auth/login#login");
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { email, password, repeat, name } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            res.redirect("/auth/login#register");
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                name,
                password: hashPassword,
                cart: { items: [] },
            });
            await user.save();
            res.redirect("/auth/login#login");
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
