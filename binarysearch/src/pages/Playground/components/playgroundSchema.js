import { z } from 'zod';

const schema = z.object({
    title: z.string().min(1),
    type: z.enum(['private', 'public']),
    startDate: z.date(),
    startTime: z.string().min(2), // Assuming startTime is a string
    noOfUsers: z.number(),
    noOfQuestions: z.number(),
    difficultyLevel: z.enum(['easy', 'medium', 'hard']),
    challangeTime: z.number(), // Assuming challangeTime is a string
});

export default schema;
