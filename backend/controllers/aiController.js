const { GoogleGenAI } = require("@google/genai");

// Create Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate Task Description
const generateDescription = async (req, res) => {
  try {

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const prompt = `Generate a professional task description for: ${title}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      title,
      description: response.text,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI Generation Failed",
    });

  }
};
// Generate Tasks for a Project
const generateTasks = async (req, res) => {

  try {

    const { projectTitle, projectDescription } = req.body;

    if (!projectTitle || !projectDescription) {

      return res.status(400).json({
        message: "Project Title and Description are required",
      });

    }

    const prompt = `
You are a software project planner.

Project Title:
${projectTitle}

Project Description:
${projectDescription}

Generate 8 to 10 software development tasks.

Return ONLY a valid JSON array.

Format:

[
  {
    "title": "Authentication",
    "description": "Implement user login and registration using JWT.",
    "priority": "High"
  }
]

Rules:
- Return only JSON.
- No markdown.
- No explanation.
- Priority must be High, Medium or Low.
`;

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: prompt,

    });

    const text = response.text.trim();

    const tasks = JSON.parse(text);

    res.status(200).json(tasks);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "AI Task Generation Failed",

    });

  }

};

// Save AI Generated Tasks
const Task = require("../models/Task");

const saveGeneratedTasks = async (req, res) => {

  try {

    const { projectId, tasks } = req.body;

    if (!projectId || !tasks || tasks.length === 0) {

      return res.status(400).json({

        message: "Project and Tasks are required",

      });

    }

    const createdTasks = [];

    for (const task of tasks) {

      const newTask = await Task.create({

        title: task.title,

        description: task.description,

        priority: task.priority,

        status: "To Do",

        project: projectId,

      });

      createdTasks.push(newTask);

    }

    res.status(201).json({

      message: "Tasks Saved Successfully",

      tasks: createdTasks,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Failed to Save Tasks",

    });

  }

};


module.exports = {
  generateDescription,
  generateTasks,
  saveGeneratedTasks,
};