import Router from 'express'
const judgeRoute = Router()

judgeRoute.post('/run-code', async (req, res) => {
    const { source_code, language_id, stdin,  expected_output } = req.body
    const postData = {
        source_code: source_code,
        language_id: language_id,
        stdin: stdin,
        expected_output: expected_output
    };
    console.log("RECEIVED FROM FRONTEND:", postData);
    try {

        const result = await fetch("http://127.0.0.1:2358/submissions/?base64_encoded=false&wait=false", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await result.json();
        console.log("Judge0 Response:", data);
        res.json(data);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Failed to connect to Judge0" });
    }
})

judgeRoute.post('/submit-code', (req, res) => {
    console.log("Code Ran")
})
export default judgeRoute