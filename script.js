// Array com as questões relacionadas à meta 12.3 dos ODS - reduzir o desperdício de alimentos
const questions = [
  {
    question: "Qual é o principal objetivo da meta 12.3 dos ODS?",
    options: [
      "Melhorar a qualidade dos alimentos industrializados",
      "Dobrar a produção de alimentos orgânicos",
      "Reduzir pela metade o desperdício de alimentos per capita mundial",
      "Aumentar a exportação de produtos agrícolas"
    ],
    answer: 2
  },
  {
    question: "Qual estratégia pode ajudar a diminuir o desperdício de alimentos, conforme a meta 12.3?",
    options: [
      "Promover o consumo excessivo para gerar economia de escala",
      "Aumentar a produção sem controle",
      "Incentivar o descarte com desconto",
      "Implementar plataformas de redistribuição de alimentos excedentes"
    ],
    answer: 3
  },
  {
    question: "Como a tecnologia pode contribuir para atingir a meta 12.3?",
    options: [
      "Criando aplicativos para conectar doadores e instituições",
      "Mantendo sistemas desatualizados sem monitoramento",
      "Aumentando o custo dos alimentos",
      "Reduzindo a divulgação de dados sobre desperdício"
    ],
    answer: 0
  },
  {
    question: "Por que reduzir o desperdício de alimentos é importante para a sustentabilidade?",
    options: [
      "Porque diminui o impacto ambiental e ajuda a combater a fome",
      "Porque aumenta o preço dos alimentos",
      "Porque reduz a variedade de produtos no mercado",
      "Porque favorece grandes corporações agrícolas"
    ],
    answer: 0
  },
  {
    question: "Uma ação alinhada à meta 12.3 é:",
    options: [
      "Promoção de eventos que incentivam o consumo excessivo",
      "Incentivo ao descarte sem critérios",
      "Campanhas de conscientização sobre o reaproveitamento de alimentos",
      "Redução de investimentos em tecnologias sustentáveis"
    ],
    answer: 2
  },
  {
    question: "Qual das alternativas abaixo NÃO está relacionada à redução do desperdício de alimentos?",
    options: [
      "Plataformas de redistribuição de alimentos",
      "Monitoramento da cadeia de suprimentos alimentícios",
      "Aumento na produção de embalagens descartáveis",
      "Campanhas de educação para o reaproveitamento"
    ],
    answer: 2
  },
  {
    question: "Qual o prazo estabelecido para atingir a redução do desperdício de alimentos per capita mundial?",
    options: [
      "Até 2050",
      "Até 2025",
      "Até 2040",
      "Até 2030"
    ],
    answer: 3
  },
  {
    question: "Uma plataforma digital para redistribuição de alimentos pode beneficiar principalmente:",
    options: [
      "Comunidades carentes e instituições sociais",
      "Grandes redes varejistas",
      "Indústrias alimentícias",
      "Empresas de tecnologia sem atuação social"
    ],
    answer: 0
  },
  {
    question: "Em termos de sustentabilidade, a redução do desperdício de alimentos contribui para:",
    options: [
      "Aumento de resíduos em aterros sanitários",
      "A diminuição dos impactos ambientais e melhoria na segurança alimentar",
      "Redução dos investimentos em energias renováveis",
      "Aumento da importação de alimentos"
    ],
    answer: 1
  },
  {
    question: "Um dos benefícios de implementar um sistema de redistribuição de alimentos é:",
    options: [
      "Valorizar a economia circular e reduzir a fome",
      "Diminuir a diversidade no mercado",
      "Aumentar a competitividade entre fornecedores",
      "Elevar os prejuízos dos estabelecimentos"
    ],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

// Seleciona os elementos das telas
const welcomeScreen = document.getElementById("welcome-screen");
const startBtn = document.getElementById("start-btn");

const quizContainerScreen = document.getElementById("quiz-container");
const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");

const resultsScreen = document.getElementById("results-screen");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// Evento para iniciar o quiz a partir da tela de boas-vindas
startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  quizContainerScreen.style.display = "block";
  loadQuestion();
});

// Carrega a questão atual com efeito fade-in
function loadQuestion() {
  // Limpa o conteúdo atual e oculta o botão "Próxima"
  quizContainer.innerHTML = "";
  nextButton.style.display = "none";
  
  // Se todas as questões foram respondidas, exibe os resultados
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }
  
  const q = questions[currentQuestion];

  // Cria e insere o número e o texto da questão
  const questionNumber = document.createElement("div");
  questionNumber.className = "question-number";
  questionNumber.textContent = "Pergunta " + (currentQuestion + 1) + " de " + questions.length;

  const questionText = document.createElement("div");
  questionText.className = "question-text";
  questionText.textContent = q.question;

  quizContainer.appendChild(questionNumber);
  quizContainer.appendChild(questionText);

  // Adiciona efeito fade-in
  quizContainer.classList.remove("fade-in");
  setTimeout(() => {
    quizContainer.classList.add("fade-in");
  }, 10);

  // Cria e insere as opções de resposta
  const optionsList = document.createElement("ul");
  optionsList.className = "options";
  
  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button, index));
    li.appendChild(button);
    optionsList.appendChild(li);
  });
  quizContainer.appendChild(optionsList);
}

// Função executada ao selecionar uma opção
function selectOption(button, selectedIndex) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
  });
  
  const currentQ = questions[currentQuestion];

  if (selectedIndex === currentQ.answer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    // Destaca a resposta correta
    buttons.forEach(btn => {
      if (btn.textContent === currentQ.options[currentQ.answer]) {
        btn.classList.add("correct");
      }
    });
  }
  
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  loadQuestion();
});

// Exibe a tela final com o placar e os links de estudos
function showResults() {
  quizContainerScreen.style.display = "none";
  resultsScreen.style.display = "block";
  
  scoreText.innerHTML = `Sua pontuação: ${score} de ${questions.length}`;
}

// Evento para reiniciar o quiz
restartBtn.addEventListener("click", () => {
  // Reseta as variáveis
  currentQuestion = 0;
  score = 0;
  
  // Oculta a tela de resultados e exibe novamente a tela do quiz
  resultsScreen.style.display = "none";
  quizContainerScreen.style.display = "block";
  loadQuestion();
});
