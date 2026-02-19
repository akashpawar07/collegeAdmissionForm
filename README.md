graph TD
    subgraph Client Tier "Frontend (HTML/CSS/JS)"
        S[Student Browser] -.->|Auto-saves data| SS[(sessionStorage)]
        S -->|1. HTTP POST: Submit Form Data & Files| R
        A[Admin Browser] -->|HTTP GET/PATCH: Fetch/Update| R
    end

    subgraph Application Tier "Backend (Node.js & Express.js)"
        R[Express.js Router] --> M[Multer Middleware]
        M -->|Parses Images & PDFs| C[Controllers & Validation]
    end

    subgraph Data Tier "Database"
        C <-->|Mongoose Schema| DB[(MongoDB)]
    end

    style S fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style A fill:#ede9fe,stroke:#8b5cf6,stroke-width:2px
    style SS fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style R fill:#e0f2fe,stroke:#4f46e5,stroke-width:2px
    style M fill:#e0f2fe,stroke:#4f46e5,stroke-width:2px
    style C fill:#e0f2fe,stroke:#4f46e5,stroke-width:2px
    style DB fill:#d1fae5,stroke:#059669,stroke-width:2px
