import React from 'react';
import Button from '../src/components/Button';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import db from '../db.json';

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando....
            </Widget.Header>
            <Widget.Content>
                [Desafio do loading]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({ 
    question, 
    totalQuestions,
    questionIndex,
    onSubmit,
 }){
    const questionId = `question__${questionIndex}`; 
    return(
        <Widget>
            <Widget.Header>
            {/* <BackLinkArrow href="/" /> */}
            <h3>
                {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}                
            </h3>
            </Widget.Header>
                <img
                alt="Descrição"
                style={{
                    width: '100%',
                    heigth: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
                />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return (
                          <Widget.Topic
                            as="label"
                            htmlFor={alternativeId}
                          >
                            <input 
                              //style={{ display: 'none' }}
                              id={alternativeId}
                              type="radio" 
                              name={questionId}
                            />
                            {alternative}
                          </Widget.Topic>
                        );
                    })}

                    {/* <pre>
                        {JSON.stringify(question, null, 4)}
                    </pre> */}
                    

                    <Button type="submit">
                        Confirmar
                    </Button>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {

    const [screenState, setScreenState] = React.useState(screenStates.LOADING) ;
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    // React chama de: Efeitos || Effects
    // React.useEffect
    // nasceu === didMount
    // atualizado === willUpdate
    // morre === willUnmount

    React.useEffect(() => {
        setTimeout(() => { setScreenState(screenStates.QUIZ); } , 1 * 1000 );
    }, []);
    
    function handleSubmitQuiz(){
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(questionIndex + 1)
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.QUIZ && (               
                    <QuestionWidget 
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Voçê acertou X questões!</div>}
            </QuizContainer>
        </QuizBackground>                    
    );
}