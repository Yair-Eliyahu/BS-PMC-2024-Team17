const auth = {
    onAuthStateChange: jest.fn((callback) => {
      callback('SIGNED_IN', { user: { email: 'test@example.com' } })
    }),
  }
  
  module.exports = { createSupabaseClient: () => ({ auth }) }
  