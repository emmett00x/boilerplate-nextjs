/** @format */

import React from 'react';

import { NextPageContext } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { UIButton } from '../common/components.ui/Button';
import { UILoader } from '../common/components.ui/Loader';
import { selectorAuth } from '../redux/auth/selectors';
import { thunkAuth } from '../redux/auth/thunk';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import styles from '../styles/Home.module.css';

export async function getStaticProps({ locale }: NextPageContext) {
  if (!locale) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isAuthenticated, isLoading } = useAppSelector(selectorAuth);
  const dispatch = useAppDispatch();

  const onClickLogin = () => {
    dispatch(
      thunkAuth({
        isAuthenticated: true,
        isLoading: false,
      }),
    );
  };

  if (isLoading) return <UILoader />;

  return (
    <>
      <Head>
        <NextSeo
          title="Using More of Config"
          description="This example uses more of the available config options."
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: 'https://www.url.ie/a',
            title: 'Create Next App',
            description: 'Generated by create next app',
            images: [
              {
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
                type: 'image/jpeg',
              },
              {
                url: 'https://www.example.ie/og-image-02.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second',
                type: 'image/jpeg',
              },
              { url: 'https://www.example.ie/og-image-03.jpg' },
              { url: 'https://www.example.ie/og-image-04.jpg' },
            ],
            siteName: 'SiteName',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </h1>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
          <div className={styles.thirteen}>
            <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
          </div>
        </div>
        {!isAuthenticated && <UIButton label={i18n?.t('login')} onClick={() => onClickLogin()} />}

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Find in-depth information about Next.js features and&nbsp;API.</p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.</p>
          </a>
        </div>
      </main>
    </>
  );
}
