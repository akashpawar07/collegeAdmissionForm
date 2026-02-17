const renderLogoutSuccess = () => `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .alert-wrapper {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-image: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://img.freepik.com/free-vector/leaves-background-color-year_23-2148380575.jpg?ga=GA1.1.919035732.1724917926&semt=ais_hybrid');
            background-size: cover; background-position: center;
            display: flex; justify-content: center; align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            z-index: 9999; margin: 0; padding: 15px; box-sizing: border-box;
        }
        .alert-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2); border-top: 4px solid #3b82f6; /* Blue Theme */
            border-radius: 12px; padding: 40px 30px;
            text-align: center; max-width: 400px; width: 100%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            color: white; box-sizing: border-box;
        }
        .alert-card h3 { margin: 0 0 10px 0; font-size: 1.4rem; font-weight: 600; color: #60a5fa; }
        .alert-card p { margin: 0 0 10px 0; font-size: 0.95rem; color: rgba(255, 255, 255, 0.9); line-height: 1.5; }
        .alert-card .sub-text { margin-bottom: 25px; font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); }
        .alert-btn {
            display: inline-block; padding: 10px 24px;
            background-color: #3b82f6; color: white;
            text-decoration: none; border-radius: 6px;
            font-weight: bold; transition: all 0.2s ease; border: none;
            width: auto;
        }
        .alert-btn:hover { background-color: #2563eb; transform: translateY(-2px); }

        /* Mobile Responsiveness */
        @media (max-width: 480px) {
            .alert-card { padding: 30px 20px; }
            .alert-card h3 { font-size: 1.25rem; }
            .alert-card p { font-size: 0.9rem; }
            .alert-card .sub-text { font-size: 0.8rem; margin-bottom: 20px; }
            .alert-btn { width: 100%; box-sizing: border-box; }
        }
    </style>
    <div class="alert-wrapper">
        <div class="alert-card">
            <h3>Logged Out</h3>
            <p>You have been successfully logged out of your account.</p>
            <p class="sub-text">Redirecting you to the login page...</p>
            <a href="/login" class="alert-btn">Login Now</a>
        </div>
    </div>
    <script>
        // Automatically redirect to login after 3 seconds
        setTimeout(() => {
            window.location.href = '/login';
        }, 3000);
    </script>
`;


module.exports = {
    renderLogoutSuccess
}