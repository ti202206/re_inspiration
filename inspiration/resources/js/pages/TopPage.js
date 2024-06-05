import React, { useEffect } from "react";
// import axios from "axios";
import "../../sass/object/project/_top.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { brainstormImage } from "../assets";
import brainstormImage from '../../assets/images/brainstorm-idea.png'; // 適切なパスに変更

function TopPage() {
    const handleRegisterClick = () => {
        window.location.href = "/register";
    };

    const handleLoginClick = () => {
        window.location.href = "/login";
    };

    // useEffect(() => {
    //     try {
    //         // コンポーネントのレンダリング中に発生するエラーをキャッチ
    //     } catch (error) {
    //         console.error("Error in TopPage:", error);
    //     }
    // }, []);

    return (
        <div>
            <Header />
            <div className="container">
                <section className="section section--concept" id="concept">
                    <h2 className="section__title">
                        あなたのInspirationを現実に。
                        <br />
                        新しい世界を作り出そう。
                    </h2>
                    <div className="concept">
                        <img
                            className="concept__image"
                            src={brainstormImage}
                            alt="イメージ"
                        />
                        <p className="concept__description">
                            普段何気ない日常の中で、
                            <br />
                            ふとしたきっかけで湧いてくるアイディアありませんか？
                            <br />
                            「おっ！これができたら面白い！」と思った瞬間にやってくる、
                            <br />
                            「今はまだ無理だな．．．」という諦め。
                            <br />
                            <br />
                            これを今から形にしていきませんか？
                            <br />
                            <br />
                            でもどうやって？
                            <br />
                            お金もないし、資金もないし、知識もない．．．
                            <br />
                            あるのはアイディアだけ．．．
                            <br />
                            <br />
                            大丈夫！このサイトであなたの「！（ひらめき）」が
                            <br />
                            〈あなた〉の、そして〈みんな〉の役に立ちます！！
                            <br />
                            <br />
                            そう、あなたが新しい世界を作るのです！！
                        </p>
                    </div>
                </section>

                <section className="section section--feature" id="feature">
                    <h2 className="section__title">
                        みんなの「あ！」がどんどん集まってます。
                    </h2>
                    <div className="feature">
                        <h3 className="feature__title">
                            アイデアの価値を最大化
                        </h3>
                        <div className="feature__description">
                            <img
                                className="feature__image--first"
                                src={brainstormImage}
                                alt="イメージ１"
                            />
                            <p className="feature__description--text1  feature__text--primary">
                                あなたのアイディアの潜在的な価値を最大限に引き出せます。
                                <br />
                                なぜなら、あなた自身で値段を決めれるのだから。
                                <br />
                                あなたが起業家である必要はありません。
                                <br />
                                消費者や利用者目線でも大丈夫。
                                <br />
                                目線が違えば、見えてくる景色も変わってくるはず。
                                <br />
                                アイディアに共感されたら、そこから新しいビジネスが始まる！
                            </p>
                        </div>
                    </div>

                    <div className="feature feature--reverse  feature--layoute__reversed">
                        <h3 className="feature__title">
                            世界を変えるチャンスがここに！
                        </h3>
                        <div className="feature__description">
                            <img
                                className="feature__image--secondary"
                                src={brainstormImage}
                                alt="イメージ２"
                            />
                            <p className="feature__description--text2 feature__description--secondary">
                                自分のアイディアが多くの人の目に止まったら、
                                <br />
                                そこから多くのビジネスが始まる。
                                <br />
                                つまり、あなたのアイディアが世界を変えるきっかけになる。
                                <br />
                                自分のアイディアに自信が持てるようになったら、
                                <br />
                                今度はあなたが実際に世界を変えることもできるかも？
                                <br />
                            </p>
                        </div>
                    </div>
                    <div className="feature">
                        <h3 className="feature__title">
                            革新的な未来を共に築こう
                        </h3>
                        <div className="feature__description">
                            <img
                                className="feature__image--tertiary"
                                src={brainstormImage}
                                alt="イメージ３"
                            />
                            <p className="feature__description--text3 feature__description--tertiary">
                                投稿されたアイディアは，評価と口コミで確認することができる。
                                <br />
                                欲しいアイディアを検索することも、
                                <br />
                                他の人のアイディアを参考しにして、
                                <br />
                                さらに自分のアイディアを磨くこともできる。
                                <br />
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section section--column" id="column">
                    <h2 className="section__title">
                        何事も最初は小さな一歩から
                    </h2>
                    <div className="column">
                        <p className="column__description">
                            ジェフ・ベゾスがAmazonを創業したのは1994年のこと。
                            <br />
                            最初は書籍のオンライン販売だったことは有名な話。
                            <br />
                            しかし彼は、インターネットの成長と、
                            <br />
                            書籍のオンライン販売が小売業界に革命をもたらす可能性を見出しました。
                            <br />
                            <br />
                            また，スティーブ・ジョブズとスティーブ・ウォズニアックが共同で開発した
                            <br />
                            パーソナルコンピューターの「Apple I」
                            <br />
                            これも，当時彼らもジョブズの両親のガレージで創業されました。
                            <br />
                            さらにAppleのiPadは、
                            <br />
                            一部の評論家からその存在意義を疑問されていました。
                            <br />
                            彼らは、大きなスマートフォンとしてしか機能しないと指摘しました。
                            <br />
                            しかし，今やモバイルデバイス市場に革命をもたらしています。
                            <br />
                            <br />
                            共に現代では世界トップクラスの企業ですが、
                            <br />
                            最初の一歩は小さなアイディアからです。
                            <br />
                            実行に移すには自信がなくても、
                            <br />
                            誰かがそれを形にしてくれます。
                            <br />
                            <br />
                            まずは、新規登録して，
                            <br />
                            毎日出てくるアイディアをしっかり掴み取りましょう。
                            <br />
                        </p>
                    </div>
                </section>

                <section className="registration">
                    <p className="registration__message">
                        あ！が消え去る前に．．．　　新規登録はこちら
                    </p>
                    <div className="registration__buttons">
                        <button
                            className="registration__button registration__button--register"
                            onClick={handleRegisterClick}
                        >
                            新規登録
                        </button>
                        <button
                            className="registration__button registration__button--login"
                            onClick={handleLoginClick}
                        >
                            ログイン
                        </button>
                    </div>
                    <ul className="registration__links">
                        <li>
                            <a href="http://">利用規約</a>
                        </li>
                        <li>
                            <a href="http://">プライバシーポリシー</a>
                        </li>
                        <li>
                            <a href="http://">特定商取引法に基づく表示</a>
                        </li>
                        <li>
                            <a href="http://">お問い合わせ</a>
                        </li>
                    </ul>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default TopPage;
