import { z } from 'zod';

const schema = z.object({
    title: z.string().min(6, 'Please enter a title, must be at least 6 characters long'),
    type: z.enum(['private', 'public']),
    startDate: z.date(),
    startTime: z.string().min(2, 'Please enter a start time'), // Assuming startTime is a string
    noOfUsers: z.number(),
    noOfQuestions: z.number(),
    difficultyLevel: z.enum(['easy', 'medium', 'hard']),
    challangeTime: z.number(), // Assuming challangeTime is a string
    invitedUsers: z.array(z.string()), // Assuming invitedUsers is an array of strings
});

export default schema;
