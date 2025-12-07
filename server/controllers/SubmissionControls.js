import { getWrapper } from "../utils/codeWrappers.js";
import judgeClient from "../utils/judgeApi.js";

export const runBatchCode = async (req, res) => {
    const { submissions, functionName } = req.body;
    // console.log(submissions.source_code)
    const processedSubmissions = submissions.map(sub => {
        // console.log(sub.source_code)
        return {
            ...sub,
            source_code: getWrapper(sub.language_id, sub.source_code, functionName)
        };
    });
    try {
        const postResponse = await judgeClient.post(
            "/submissions/batch/?base64_encoded=false&wait=false",
            { submissions: processedSubmissions }
        );
        return res.status(201).json(postResponse.data);
    } catch (error) {
        console.error("Backend Batch Error:", error);
        res.status(500).json({ error: "Failed to process batch submission" });
    }
};

export const checkBatchStatus = async (req, res) => {
    const { tokens } = req.query;
    if (!tokens) {
        return res.status(400).json({ error: "Missing tokens" });
    }
    try {
        const response = await judgeClient.get(
            `/submissions/batch?tokens=${tokens}&base64_encoded=false&fields=token,stdout,stderr,status,compile_output`
        );
        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Check Status Error:", error.message);
        return res.status(500).json({ error: "Failed to check status" });
    }
};

export const deleteCode = async (req, res) => {
    const { token } = req.body
    try {
        const response = await judgeClient.delete(`/submissions/${token}?base64_encoded=true`)
        console.log(response)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}