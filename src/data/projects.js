// Projects and hackathon entries. `kind` is the small label above each title.

export const projects = [
  {
    title: 'LedgerLine',
    kind: 'Full-stack · Online ML',
    description: 'An expense tracker that flags unusual transactions the moment they come in.',
    details:
      'Each transaction is scored by an online anomaly-detection model built with river, so it keeps learning from new data instead of being retrained in batches. FastAPI and SQLAlchemy 2.0 on the back end, React on the front, all running under Docker Compose and deployed through GitHub Actions.',
    tags: ['FastAPI', 'React', 'SQLAlchemy 2.0', 'river', 'Docker Compose', 'GitHub Actions'],
    github: 'https://github.com/abhiram35/Ledgerline',
  },
  {
    title: 'Multi-Object Detection',
    kind: 'Computer vision',
    description: 'A single-stage object detector written from scratch in PyTorch.',
    details:
      'YOLO/SSD-style, with no detection library: anchor generation, IoU-based target matching, a multi-part detection loss, non-maximum suppression at inference, and mAP for evaluation.',
    tags: ['PyTorch', 'Anchors', 'IoU matching', 'NMS', 'mAP'],
    github: 'https://github.com/abhiram35/multi-object-detection',
  },
  {
    title: 'Crop Yield Prediction',
    kind: 'Regression',
    description: 'Predicting crop yield from agricultural features with linear regression.',
    details: 'The full loop on a small problem: data cleaning, feature preparation, training and evaluation.',
    tags: ['Python', 'Linear regression'],
    github: 'https://github.com/abhiram35/Ml_crop-prediction',
  },
  {
    title: 'Movie Recommendations',
    kind: 'Recommender system',
    description: 'A content-based recommender that finds movies similar to the one you liked.',
    details: 'Movie metadata is cleaned with pandas, vectorised with scikit-learn, and titles are ranked by cosine similarity.',
    tags: ['Python', 'scikit-learn', 'pandas'],
    github: 'https://github.com/abhiram35/movie_recommendation',
  },
];

export const hackathons = [
  {
    title: 'RL Trading Agent',
    kind: 'KSSEM Hackathon',
    description: 'A reinforcement-learning agent that trades on technical indicators.',
    details:
      'Trained with Stable-Baselines3 in a custom Gymnasium environment, using RSI, MACD and volume as observations. Served through FastAPI with MongoDB storage and a React dashboard on top.',
    tags: ['Stable-Baselines3', 'Gymnasium', 'FastAPI', 'MongoDB', 'React'],
    github: 'https://github.com/abhiram35/hackathon26',
  },
  {
    title: 'Razorpay Buildathon',
    kind: 'Razorpay Buildathon',
    description: 'What I built during the Razorpay Buildathon.',
    tags: [],
    github: 'https://github.com/abhiram35/razorpay',
  },
];
