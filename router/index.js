const Router = require("express").Router;
const router = new Router();
const nodemailer = require("nodemailer");
const {logger} = require("sequelize/lib/utils/logger");

router.post('/sendMail', async (req, res) => {
    console.log("req", req.body)

    try {
        const nonPlans  = !req.body.planlrn && !req.body.pmla && !req.body.planku && !req.body.planchs;
        const plans = `
        ${req.body.planlrn ? "- План ЛРН" : ""} 
        ${req.body.pmla ? "- ПМЛА" : ""} 
        ${req.body.planku ? "- План КУ" : ""} 
        ${req.body.planchs ? "- План ЧС" : ""} `
        const mail = `
            Клиент: ${req.body.name}
            Email: ${req.body.email}
            Телефон: ${req.body.tel}
            Сообщение: ${req.body.message ? req.body.message : "Сообщение отсутствует"}
            Необходима разработка планов: ${nonPlans ? `Не указано` : plans}
        `

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 587,
            secure: false,
            auth: {
                user: "ilovewebdev@mail.ru",
                pass: "0WwSZd0OTUu2HXsKntlT"
            }
        });

        const mailOptions = {
            from: "ilovewebdev@mail.ru",
            to: "ilovewebdev@mail.ru",
            subject: `Новая заявка!`,
            text: mail
        };

        // Отправка письма
        const info = await transporter.sendMail(mailOptions);

        console.log('Письмо отправлено:', info.messageId);

        res.json({
            success: true,
            message: 'Сообщение успешно отправлено!',
            messageId: info.messageId
        });
    }
    catch (error) {
        console.error('Ошибка отправки:', error);
        res.status(500).json({
            success: false,
            message: 'Произошла ошибка при отправке сообщения',
            error: error.message
        });
    }
});

module.exports = router;