import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion, MotionConfig } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   background-size: cover;
//   background-size: center;
//   flex: 1;
// `;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  // console.log('retorno do useState', name, setName);
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Head>
          <title>AluraQuiz - Modelo Base</title>
          {/* Primary Meta Tags */}
          <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
          <meta name="description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />

          {/* -- Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://metatags.io/" />
          <meta property="og:title" content="Meta Tags — Preview, Edit and Generate" />
          <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
          <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

          {/* -- Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://metatags.io/" />
          <meta property="twitter:title" content="Meta Tags — Preview, Edit and Generate" />
          <meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
          <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
        </Head>
        <QuizLogo />        
        <Widget
        as={motion.section}
        transition={{delay:0.0, duration:1.5}}
        variants={{
          show:{opacity:1, y:'0'},
          hidden:{opacity:0, y:"100%"},              
        }}
        initial="hidden"
        animate="show"
        >
          <Widget.Header>
            <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(e){
              e.preventDefault();              
              router.push(`/quiz?name=${name}`);
              // console.log('Fazendo um submissão de form via React')
              // router manda para próxima página
            }}
            >
              <Input 
                // onChange={function(e) {
                //   console.log(e.target.value);
                //   // State
                //   // name = e.target.value;
                //   setName(e.target.value);
                // } }
                // usando arrow function temos ....
                onChange={(e) => setName(e.target.value)}
                name="nomeDoUsuario"
                placeholder="Diz aí o seu nome"
                value={name} />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{delay:0.5, duration:1.0}}
          variants={{
            show:{opacity:1},
            hidden:{opacity:0},              
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
            {db.external.map((linkExterno) => {
              const[projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('vercel.app', '')
                .split('.')
              return (
                <li key={linkExterno}>
                  <Widget.Topic 
                    as={Link}
                    href={`/quiz/${projectName}___${githubUser}`}
                  >
                    {`${projectName}/${projectName}`}
                  </Widget.Topic>                               
                </li>);
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
