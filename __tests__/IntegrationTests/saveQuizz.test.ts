import saveQuizz from '@/app/api/quizz/generate/saveToDb';

// Mock the db methods used by saveQuizz
jest.mock('@/db', () => ({
  db: {
    insert: jest.fn().mockImplementation(() => ({
      values: jest.fn().mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([{ insertedId: 'mocked_quizz_id' }]),
      })),
    })),
    transaction: jest.fn().mockImplementation(async (callback) => {
      await callback({
        insert: jest.fn().mockImplementation(() => ({
          values: jest.fn().mockImplementation(() => ({
            returning: jest.fn().mockResolvedValue([{ questionId: 'mocked_question_id' }]),
          })),
        })),
      });
    }),
  },
}));

describe('saveQuizz function', () => {
  it('should save a quiz and associated questions and answers to the database', async () => {
    // Define the test data
    const quizzData = {
      name: 'Sample Quiz',
      description: 'This is a sample quiz.',
      questions: [
        {
          questionText: 'What is 2 + 2?',
          answers: [
            { answerText: '3', isCorrect: false },
            { answerText: '4', isCorrect: true },
            { answerText: '5', isCorrect: false },
            { answerText: '6', isCorrect: false }
          ]
        }
      ]
    };

    const userId = 'test_user_id';

    // Call the saveQuizz function
    const result = await saveQuizz(quizzData, userId);

    // Validate the result
    expect(result).toEqual({ quizzId: 'mocked_quizz_id' });
  });

  it('should handle empty quiz data gracefully', async () => {
    // Define the test data with missing properties
    const quizzData = {
      name: '',
      description: '',
      questions: []
    };

    const userId = 'test_user_id';

    // Call the saveQuizz function
    const result = await saveQuizz(quizzData, userId);

    // Validate the result
    expect(result).toEqual({ quizzId: 'mocked_quizz_id' });
  });

  it('should handle multiple questions and answers', async () => {
    // Define the test data with multiple questions and answers
    const quizzData = {
      name: 'Sample Quiz with Multiple Questions',
      description: 'This quiz has multiple questions.',
      questions: [
        {
          questionText: 'What is 2 + 2?',
          answers: [
            { answerText: '3', isCorrect: false },
            { answerText: '4', isCorrect: true }
          ]
        },
        {
          questionText: 'What is the capital of France?',
          answers: [
            { answerText: 'Berlin', isCorrect: false },
            { answerText: 'Madrid', isCorrect: false },
            { answerText: 'Paris', isCorrect: true }
          ]
        }
      ]
    };

    const userId = 'test_user_id';

    // Call the saveQuizz function
    const result = await saveQuizz(quizzData, userId);

    // Validate the result
    expect(result).toEqual({ quizzId: 'mocked_quizz_id' });
  });

  it('should handle questions with no answers', async () => {
    // Define the test data with questions but no answers
    const quizzData = {
      name: 'Sample Quiz with No Answers',
      description: 'This quiz has questions but no answers.',
      questions: [
        {
          questionText: 'What is 2 + 2?',
          answers: []
        }
      ]
    };

    const userId = 'test_user_id';

    // Call the saveQuizz function
    const result = await saveQuizz(quizzData, userId);

    // Validate the result
    expect(result).toEqual({ quizzId: 'mocked_quizz_id' });
  });

  it('should handle invalid data gracefully', async () => {
    // Define the test data with invalid properties
    const quizzData = {
      name: 'Invalid Quiz',
      description: 'This quiz data is invalid.',
      questions: [
        {
          questionText: '', // Invalid question text
          answers: [
            { answerText: '', isCorrect: false } // Invalid answer text
          ]
        }
      ]
    };

    const userId = 'test_user_id';

    // Call the saveQuizz function
    const result = await saveQuizz(quizzData, userId);

    // Validate the result
    expect(result).toEqual({ quizzId: 'mocked_quizz_id' });
  });
});
