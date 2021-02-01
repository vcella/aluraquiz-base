import React from 'react';
import Button from '../../components/Button';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import AlternativesForm  from '../../components/AlternativesForm';
import Widget from '../../components/Widget';
import BackLinkArrow from '../../components/BackLinkArrow';
// import db from '../../../db.json';

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado:
            </Widget.Header>
            <Widget.Content>
                <p>
                    Você acertou {' '}
                    {results.filter((x) => x).length}
                    {' '} perguntas 
                </p>
                <ul>
                    {results.map((result, index) => (
                        <li key={`result__${index}`}>
                            # {index + 1} {' '} Resultado:
                            {result === true ? ' Acertou' : ' Errou'}
                        </li>
                   ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}

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
    addResult,
 }){
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)  //default
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const questionId = `question__${questionIndex}`; 
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

    return(
        <Widget>
            <Widget.Header>
            <BackLinkArrow href="/" />
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
                <AlternativesForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit();
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 3 * 1000 );                        
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        
                        const alternativeId = `alternative__${alternativeIndex}`;           
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR' ;
                        const isSelected = selectedAlternative === alternativeIndex ;
                        return (
                          <Widget.Topic
                            as="label"
                            key={alternativeId}
                            htmlFor={alternativeId}
                            data-selected={true}
                            data-status={isQuestionSubmited && alternativeStatus}
                          >
                            <input 
                              style={{ display: 'none' }}
                              id={alternativeId}
                              type="radio" 
                              name={questionId}
                              onChange={() => setSelectedAlternative(alternativeIndex)}
                            />
                            {alternative}
                          </Widget.Topic>
                        );
                    })}

                    {/* <pre>
                        {JSON.stringify(question, null, 4)}
                    </pre> */}

                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>

                    <p>selectedAlternative: {selectedAlternative} </p>
                    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}

                </AlternativesForm>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {

    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = externalQuestions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = externalQuestions[questionIndex];
    const bg = externalBg;

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

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
        <QuizBackground backgroundImage={bg}>
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.QUIZ && (               
                    <QuestionWidget 
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
        </QuizBackground>                    
    );
}