(function () {
  "use strict";

  const botConfig = window.FcManualChatbotConfig || {};
  const brandName = botConfig.brandName || "アイケアLaBo FC";
  const manualUrl = botConfig.manualUrl || "https://eyecarelabo-fc-manual.netlify.app/";
  const mountSelector = botConfig.mountSelector || "";

  const knowledgeBase = [
    {
      id: "receipt-subscription",
      category: "会計・領収書",
      title: "サブスク利用者への領収書発行",
      keywords: ["領収書", "電子領収書", "サブスク", "月2回", "月額", "支払い", "28,000"],
      answer:
        "結論、サブスクでお通いのお客様には、月々のお支払いごとに電子領収書を発行する運用で問題ありません。直営店では基本的にこの形で対応しています。月2回サブスクの場合も、例として「5月分 28,000円」のように、該当月のお支払い金額に対して電子領収書を発行してください。",
    },
    {
      id: "refund-guarantee",
      category: "契約・返金",
      title: "全額返金保証の対象条件",
      keywords: ["返金", "全額返金", "保証", "回数券", "変化", "視力", "0.01", "0.1", "トレーニング", "来店頻度"],
      answer:
        "回数券をご利用いただいても変化が見られなかった場合は、全額返金保証の対象です。ただし、ご自宅でお伝えしているトレーニングを実施していること、適切な来店頻度を守っていることなど、ご案内内容に取り組んでいただいた上で、それでも変化が確認できなかった場合に限ります。0.1未満の変化も含め、通う前より少しでも視力向上が確認できている場合は返金対象外です。推奨内容に全て取り組んだにも関わらず0.01も変化が見られなかった場合は、回数券費用を全額返金する運用です。",
    },
    {
      id: "hpb-coupon-menu",
      category: "集客・HPB",
      title: "ホットペッパーで独自メニューを同時掲載できるか",
      keywords: ["ホットペッパー", "HPB", "ハンドセラピス", "同時掲載", "独自メニュー", "クーポン", "メニュー"],
      answer:
        "アイケアLaBoとハンドセラピスを同時にホットペッパー内で打ち出す形での掲載は、基本的にNGです。アイケアLaBoは「目に特化した整体」という専門性を軸にしたFCブランドのため、独自メニュー掲載には一定の制限があります。ただし、同一店舗内でハンドセラピスを運営していること自体の告知やご案内は問題ありません。",
    },
    {
      id: "bad-review-template",
      category: "口コミ・クレーム",
      title: "施術後の赤み・違和感に関する口コミ返信",
      keywords: ["クレーム", "口コミ", "赤み", "違和感", "ジェル", "肌", "低刺激", "返信", "レビュー"],
      answer:
        "口コミ返信では、まずご不安なお気持ちにさせたことへのお詫びを伝えます。その上で、施術後のお目元やお肌の状態は体質や当日のコンディションにより一時的に赤みや違和感が出る場合があること、施術時のジェルや刺激により敏感に反応するケースがあることを説明します。数日経っても改善しない場合や不安がある場合は店舗へ連絡いただくよう案内し、今後は肌状態に合わせて低刺激タイプのジェルも用意し、配慮して対応する旨を伝えます。",
    },
    {
      id: "training-absence",
      category: "研修",
      title: "全体研修を欠席・途中参加した場合",
      keywords: ["全体研修", "欠席", "途中参加", "動画", "レポート", "Googleドキュメント", "A4"],
      answer:
        "全体研修を欠席または途中参加した場合は、後日アップロードされる研修動画を視聴し、GoogleドキュメントにA4サイズ程度で内容をまとめてレポート提出をお願いする運用です。動画URLは本部から共有されたプレイリストを確認してください。",
      links: [{ label: "研修動画プレイリスト", url: "https://m.youtube.com/playlist?list=PL8LOcapyEGEmzjJ331iZSC9QBMBDbkArG" }],
    },
    {
      id: "hpb-register-bank",
      category: "集客・HPB",
      title: "サロンボードのレジ機能とポイント口座",
      keywords: ["ホットペッパー", "HPB", "サロンボード", "レジ", "ポイント", "口座", "支払い口座"],
      answer:
        "サロンボードのレジ機能は、本部では使用していません。ただし無料機能のため、導入するかどうかは店舗側で検討して問題ありません。ホットペッパーのポイント分の支払い口座は、店舗の口座を設定して問題ありません。",
    },
    {
      id: "help-dispatch",
      category: "人事・労務",
      title: "ヘルプと出向の違い・費用",
      keywords: ["ヘルプ", "出向", "スタッフ", "人員", "費用", "時給", "交通費", "1,625", "55,000", "2,200"],
      answer:
        "FC店舗へスタッフが入る場合は、急な人員補助の「ヘルプ」と、契約書締結のうえ配属する「出向」があります。ヘルプは、出勤店舗、出退勤時間、休憩、帰宅経路、交通費、契約対応の有無を共有します。ヘルプ費用は時給一律1,625円、別途交通費です。1ヶ月単位の出向は月額55,000円、別途交通費・その他発生費用です。週2〜3回などの日単位出向は1日2,200円、別途交通費・その他発生費用を日割りで請求します。",
    },
    {
      id: "free-treatment",
      category: "営業・販促",
      title: "無料施術をしてよいケース",
      keywords: ["無料施術", "無料", "インフルエンサー", "紹介", "ビジネスマン", "体験"],
      answer:
        "無料施術は、意味がある場合であれば問題ありません。例えば、影響力が高い10万人超えのインフルエンサーや、紹介力の高いビジネスマンなどです。意味なく無料にすると店舗側が疲弊するため、基本的には料金をいただく運用です。",
    },
    {
      id: "eyecare-glasses-price",
      category: "物販",
      title: "アイケアグラスの料金",
      keywords: ["アイケアグラス", "メガネ", "プリズム", "上下斜位", "度数", "フレーム", "35,000", "40,000", "50,000"],
      answer:
        "アイケアグラスは、セミオーダーフレームが3種類あります。お客様のお好きなメガネフレームを持ち込む場合も料金は同じです。内外プリズムのみは35,000円（税込）、上下斜位も入れる場合はプラス5,000円で40,000円（税込）です。度数を入れる場合は、現状検眼できるのが本店のみのため、本店へ来店いただく形となり、料金は50,000円からです。",
    },
    {
      id: "preopen-coupon",
      category: "集客・HPB",
      title: "プレオープン期間の初回クーポン価格",
      keywords: ["プレオープン", "初回", "クーポン", "HPB", "ホットペッパー", "4,980", "1,980", "特別価格"],
      answer:
        "結論、HPBクーポンは基本的に通常の4,980円クーポンでの掲載を推奨しています。知人や紹介の方こそ、応援やお祝いの気持ちも含め、適正価格で来店いただけるケースが多いためです。プレオープン期間限定で特別クーポンを追加する場合は、1,980円までであれば可能です。その他のクーポン追加や特別価格設定を希望する場合は、事前に本部へ確認してください。",
    },
    {
      id: "ad-metrics",
      category: "広告",
      title: "Meta広告の指標説明",
      keywords: ["広告", "Meta", "メタ広告", "CPM", "Imp", "インプレッション", "Click", "CTR", "CPC", "COST", "フォーム到達", "予約数", "CPA"],
      answer:
        "CPMは広告を1,000回表示するのにかかった広告費、Impは広告が画面に表示された回数、Clickは広告がクリックされた回数です。CTRは表示に対するクリック率、CPCは1クリックあたりの広告費、COSTは使用した広告費の合計です。フォーム到達は予約フォームまで到達した人数、フォーム転換率はクリック後にフォームまで進んだ割合、フォーム転換単価はフォーム到達1件あたりの費用です。予約数は予約完了件数、予約率はフォーム到達者のうち予約完了した割合、予約単価CPAは1件の予約を獲得するためにかかった広告費です。",
    },
    {
      id: "pre-employment-test",
      category: "研修・テスト",
      title: "入社前 基礎テスト",
      keywords: ["入社前", "基礎テスト", "テスト", "66問", "100点", "80点", "基礎編", "制限時間"],
      answer:
        "入社前の基礎テストは、制限時間60分、目安45分、全66問、100点満点、合格80点以上です。出題範囲は教科書「基礎編」で、形式は4択、○×、並べ替え、記述です。受験時は氏名とメールアドレスを入力し、静かな環境と安定した回線で受験してください。受験中はブラウザを閉じたりタブを切り替えたりせず、資料参照は不可です。",
      links: [{ label: "入社前 基礎テスト", url: "https://script.google.com/macros/s/AKfycbwtooRXBcOoQxSFHjUUFsTUPzQGeNXBS7-IPd70rnzEplNiaLF11corBRQo_DOaW3CVbg/exec" }],
    },
    {
      id: "applied-test",
      category: "研修・テスト",
      title: "4日間研修後 応用編テスト",
      keywords: ["4日間研修", "応用編", "本試験", "テスト", "50問", "100点", "80点", "受験バージョン", "A", "B", "C"],
      answer:
        "4日間研修後の本試験は、応用編テストです。制限時間60分、目安45分、全50問、100点満点、合格80点以上です。出題範囲は教科書「応用編」、事前動画、4日間研修です。受験時は指定された受験バージョンA/B/Cをプルダウンで選択し、氏名とメールアドレスを入力して開始します。資料参照は不可です。",
      links: [{ label: "4日間研修後 応用編テスト", url: "https://script.google.com/macros/s/AKfycbyyWaWXsTdzd7bgrKO2Sdo8Gvf0HeAkTH_NSSdv0VVeE1zL9zfPoiOfh8jnrc7Lc0baHw/exec" }],
    },
    {
      id: "hpb-password",
      category: "集客・HPB",
      title: "HPBパスワード変更の運用",
      keywords: ["HPB", "ホットペッパー", "パスワード", "SATTOU", "変更", "サロンボード"],
      answer:
        "HPBのパスワードは、SATTOUと連携している関係上、基本的には変更しない運用を推奨しています。期限到来などで変更が必要になった場合は、一度パスワードを変更した後、同様の操作で元のパスワードへ再度戻してください。",
    },
    {
      id: "product-incentive",
      category: "物販",
      title: "物販インセンティブ",
      keywords: ["物販", "インセンティブ", "アイケアグラス", "セミオーダー", "フルオーダー", "メモリック", "メリンゾール", "グレードアップ"],
      answer:
        "現状、物販インセンティブがある商品はアイケアグラスのみです。アイケアグラスのセミオーダーは2,000円、フルオーダーは3,000円です。メモリックとメリンゾールには現状インセンティブ設定はありません。ただし販売金額が入金金額に加算されるため、結果的にグレードアップにつながります。",
    },
    {
      id: "new-store-evidence",
      category: "営業・説明",
      title: "新規店舗で使う実績データ・エビデンス",
      keywords: ["新規店舗", "実績", "データ", "エビデンス", "論文", "8月", "4回", "8回", "16回", "資料動画"],
      answer:
        "エビデンスについては、8月頃に論文が出る予定のため、そちらを活用してください。ただし、4回・8回・16回で必ずこうなるとは言い切れない点に注意が必要です。実際のお客様数名のデータやお声は、共有済みの「資料動画纏め」にあるため、個人差がある前提で実例として口頭ベースで伝えることは可能です。単なる疲労回復や視力改善サロンではなく、アイケアLaBoの価値を自分自身が理解し、実体験を持つことが重要です。",
    },
    {
      id: "customer-segment",
      category: "顧客属性",
      title: "顧客の男女比・ボリュームゾーン",
      keywords: ["男女比", "顧客属性", "年齢層", "会社員", "経営者", "眼精疲労", "脳疲労", "老眼", "子ども", "視力", "学力"],
      answer:
        "男女比はざっくり6:4です。Tier1は20代後半から40代前半で、会社員・経営者が中心、訴求軸は眼精疲労と脳疲労です。Tier2は40代前半から60代で、経営者・役職者・高齢者が中心、訴求軸は老眼です。Tier3は5〜10代で、子どもや子を持つ親が中心、訴求軸は子どもの視力と学力向上です。",
    },
    {
      id: "sv-career",
      category: "キャリア",
      title: "FC店SVのキャリア",
      keywords: ["SV", "キャリア", "FC店", "本部", "業務委託", "20店舗", "教育部", "新規事業"],
      answer:
        "FC店SVのキャリアとしては、オーナー様の会社で新しい事業を一緒に立ち上げる、本部に業務委託として関わり20店舗目安で管轄する、といった選択肢があります。SVランクになると、直営でも教育部や新規事業立ち上げなど、キャリアが多様になるイメージです。",
    },
    {
      id: "work-rules-vacation",
      category: "人事・労務",
      title: "就業規則・お盆休み・アニバーサリー休暇",
      keywords: ["就業規則", "お盆休み", "お盆休暇", "アニバーサリー休暇", "年間休日", "119日", "公休", "年末年始", "社労士"],
      answer:
        "本部では年間休日119日で運用しています。31日の月は公休10日、31日未満の月は公休9日です。お盆休暇は店舗休業ではなく、8月13日〜16日の期間内でスタッフごとに特別休暇として1日付与する運用です。年末年始休暇は12月31日〜1月2日の3日間です。アニバーサリー休暇は本人や家族の誕生日などに年間1日取得できる特別休暇として運用しています。就業規則は各社の運営体制や雇用形態に合わせ、社労士にも相談しながら整備するのがおすすめです。",
    },
    {
      id: "eye-disease-guide",
      category: "施術可否",
      title: "眼病に関する施術可否",
      keywords: ["眼病", "施術可否", "ガイド", "マニュアル", "施術", "禁忌"],
      answer:
        "眼病に関する質問は、マニュアルの施術可否ガイドを確認してください。判断が難しい場合は、自己判断で案内せず本部へ確認する運用が安全です。",
      links: [{ label: "FCマニュアル", url: manualUrl }],
    },
    {
      id: "memoric-child",
      category: "物販",
      title: "メモリックを子どもが飲んでよいか",
      keywords: ["メモリック", "子供", "子ども", "10歳", "小学生", "高学年", "低学年", "半分"],
      answer:
        "メモリックは、小学高学年であれば大人と同じように飲んでもらって大丈夫です。低学年の場合は半分の量を推奨しています。",
    },
  ];

  const sampleQuestions = [
    "領収書はどうやって発行しますか？",
    "HPBのクーポンはいくらまで出せますか？",
  ];

  const stopWords = new Set(["です", "ます", "する", "した", "して", "について", "ください", "教えて", "場合", "どう", "とは"]);

  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
      .replace(/[‐－―ー]/g, "-")
      .replace(/[^\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-z0-9]+/gu, " ")
      .trim();
  }

  function tokenize(text) {
    return normalizeText(text)
      .split(/\s+/)
      .flatMap((part) => {
        if (!part) return [];
        if (/^[a-z0-9]+$/.test(part)) return [part];
        const chunks = [part];
        for (let size = 2; size <= 5; size += 1) {
          for (let index = 0; index <= part.length - size; index += 1) {
            chunks.push(part.slice(index, index + size));
          }
        }
        return chunks;
      })
      .filter((token) => token && !stopWords.has(token));
  }

  function scoreEntry(query, entry) {
    const queryTokens = tokenize(query);
    const queryNorm = normalizeText(query);
    const keywordTokens = entry.keywords.flatMap(tokenize);
    const titleTokens = tokenize(entry.title);
    const answerTokens = tokenize(entry.answer);
    let score = 0;

    queryTokens.forEach((token) => {
      if (keywordTokens.includes(token)) score += 9;
      if (titleTokens.includes(token)) score += 5;
      if (answerTokens.includes(token)) score += 1.5;
    });

    entry.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedKeyword && queryNorm.includes(normalizedKeyword)) score += 16;
    });

    return score;
  }

  function searchKnowledge(query) {
    return knowledgeBase
      .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function injectStyles() {
    if (document.getElementById("fc-manual-chatbot-style")) return;

    const style = document.createElement("style");
    style.id = "fc-manual-chatbot-style";
    style.textContent = `
      .fc-bot-root {
        --fc-line: #5d8fdc;
        --fc-line-dark: #4779cc;
        --fc-ink: #171b22;
        --fc-muted: #7c8aa0;
        --fc-soft: #eef5ff;
        --fc-card: #ffffff;
        --fc-border: #d8e5f6;
        --fc-shadow: 0 18px 48px rgba(48, 92, 154, 0.18);
        color: var(--fc-ink);
        font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", "YuGothic", "Noto Sans JP", "Segoe UI", sans-serif;
      }
      .fc-bot-inline {
        width: 100%;
        height: 100%;
        min-height: 0;
      }
      .fc-bot-button {
        position: fixed;
        right: calc(18px + env(safe-area-inset-right));
        bottom: calc(18px + env(safe-area-inset-bottom));
        z-index: 2147483000;
        min-height: 54px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: 0;
        border-radius: 999px;
        padding: 0 18px;
        background: var(--fc-line);
        color: #fff;
        box-shadow: var(--fc-shadow);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }
      .fc-bot-button-icon {
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        font-size: 16px;
      }
      .fc-bot-panel {
        position: fixed;
        right: calc(18px + env(safe-area-inset-right));
        bottom: calc(86px + env(safe-area-inset-bottom));
        z-index: 2147483000;
        width: min(390px, calc(100vw - 28px));
        height: min(640px, calc(100vh - 112px));
        height: min(640px, calc(100dvh - 112px - env(safe-area-inset-bottom)));
        min-height: 430px;
        display: none;
        grid-template-rows: auto 1fr auto;
        overflow: hidden;
        border: 1px solid var(--fc-border);
        border-radius: 18px;
        background: var(--fc-card);
        box-shadow: var(--fc-shadow);
      }
      .fc-bot-root.is-open .fc-bot-panel {
        display: grid;
      }
      .fc-bot-inline .fc-bot-button,
      .fc-bot-inline .fc-bot-close {
        display: none;
      }
      .fc-bot-inline .fc-bot-panel {
        position: static;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-width: none;
        margin: 0 auto;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }
      .fc-bot-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 18px;
        border-bottom: 1px solid var(--fc-border);
        background: var(--fc-card);
      }
      .fc-bot-inline .fc-bot-header {
        border-bottom: 0;
        background: linear-gradient(135deg, #5f93e6 0%, #4f7fd5 100%);
        color: #fff;
        border-radius: 24px 24px 0 0;
        min-height: 80px;
        margin-left: 72px;
      }
      .fc-bot-avatar {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        border-radius: 50%;
        background: var(--fc-line);
        color: #fff;
        font-weight: 800;
      }
      .fc-bot-inline .fc-bot-avatar {
        width: 62px;
        height: 62px;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        background: #fff;
        color: transparent;
        box-shadow: 0 12px 28px rgba(48, 92, 154, 0.12);
      }
      .fc-bot-inline .fc-bot-avatar::before {
        content: "";
        width: 50px;
        height: 50px;
        display: block;
        background: url("/eyecare-logo.png") center / contain no-repeat;
      }
      .fc-bot-title {
        min-width: 0;
        flex: 1;
      }
      .fc-bot-title strong {
        display: block;
        font-size: 18px;
      }
      .fc-bot-title span {
        display: block;
        margin-top: 2px;
        color: var(--fc-muted);
        font-size: 14px;
      }
      .fc-bot-inline .fc-bot-title span {
        color: rgba(255, 255, 255, 0.86);
      }
      .fc-bot-close {
        width: 36px;
        height: 36px;
        border: 1px solid var(--fc-border);
        border-radius: 10px;
        background: #fff;
        color: var(--fc-ink);
        font: inherit;
        cursor: pointer;
      }
      .fc-bot-messages {
        min-height: 0;
        overflow-y: auto;
        padding: 0 0 18px 72px;
        background: transparent;
      }
      .fc-bot-message {
        max-width: 88%;
        margin: 0 0 10px;
        padding: 15px 17px;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0 10px 30px rgba(48, 92, 154, 0.1);
        font-size: 14px;
        line-height: 1.85;
        white-space: pre-wrap;
      }
      .fc-bot-message.user {
        margin-left: auto;
        border-bottom-right-radius: 4px;
        background: #8de055;
      }
      .fc-bot-inline .fc-bot-message {
        max-width: 100%;
        font-size: 16px;
      }
      .fc-bot-inline .fc-bot-message.user {
        background: var(--fc-line);
        color: #fff;
        border-radius: 18px 18px 4px 18px;
      }
      .fc-bot-message.bot {
        border-radius: 0 0 24px 24px;
      }
      .fc-bot-message small {
        display: block;
        margin-bottom: 5px;
        color: var(--fc-muted);
        font-weight: 700;
        white-space: normal;
      }
      .fc-bot-links {
        display: grid;
        gap: 6px;
        margin-top: 9px;
      }
      .fc-bot-links a {
        color: var(--fc-line-dark);
        font-weight: 700;
        text-decoration: underline;
      }
      .fc-bot-suggestions {
        display: grid;
        gap: 12px;
        padding: 0 0 18px;
        background: transparent;
      }
      .fc-bot-suggestions.is-hidden {
        display: none;
      }
      .fc-bot-suggestions::-webkit-scrollbar {
        display: none;
      }
      .fc-bot-suggestion {
        border: 1px solid var(--fc-border);
        border-radius: 20px;
        background: #fff;
        color: var(--fc-ink);
        min-height: 82px;
        width: 100%;
        padding: 0 24px 0 88px;
        font: inherit;
        font-size: 18px;
        font-weight: 700;
        text-align: left;
        cursor: pointer;
        position: relative;
        box-shadow: 0 14px 34px rgba(48, 92, 154, 0.08);
      }
      .fc-bot-suggestion::before {
        content: "□";
        position: absolute;
        left: 22px;
        top: 50%;
        width: 46px;
        height: 46px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: #edf4ff;
        color: var(--fc-line);
        transform: translateY(-50%);
        font-size: 23px;
        font-weight: 900;
      }
      .fc-bot-suggestion::after {
        content: "›";
        position: absolute;
        right: 20px;
        top: 50%;
        color: #8b9bb4;
        transform: translateY(-50%);
        font-size: 34px;
        font-weight: 400;
      }
      .fc-bot-form {
        position: sticky;
        bottom: 0;
        display: grid;
        grid-template-columns: 1fr 118px;
        gap: 12px;
        padding: 0 0 env(safe-area-inset-bottom);
        background: transparent;
      }
      .fc-bot-input {
        min-width: 0;
        height: 64px;
        border: 1px solid var(--fc-border);
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.86);
        padding: 0 22px;
        font: inherit;
        font-size: 17px;
        color: var(--fc-ink);
        outline: none;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
      }
      .fc-bot-input::placeholder {
        color: #b5c2d5;
      }
      .fc-bot-submit {
        min-width: 0;
        border: 0;
        border-radius: 28px;
        background: var(--fc-line);
        color: #fff;
        font: inherit;
        font-weight: 800;
        font-size: 18px;
        cursor: pointer;
        box-shadow: 0 12px 26px rgba(72, 122, 205, 0.28);
      }
      @media (max-width: 520px) {
        .fc-bot-button {
          right: calc(12px + env(safe-area-inset-right));
          bottom: calc(12px + env(safe-area-inset-bottom));
          min-height: 50px;
          padding: 0 14px;
        }
        .fc-bot-panel {
          right: calc(10px + env(safe-area-inset-right));
          bottom: calc(74px + env(safe-area-inset-bottom));
          width: calc(100vw - 20px);
          height: min(620px, calc(100vh - 90px));
          height: min(620px, calc(100dvh - 90px - env(safe-area-inset-bottom)));
          min-height: min(430px, calc(100dvh - 90px - env(safe-area-inset-bottom)));
          border-radius: 14px;
        }
        .fc-bot-inline .fc-bot-panel {
          width: 100%;
          height: 100%;
          max-width: none;
          min-height: 0;
          border: 0;
          border-radius: 0;
        }
        .fc-bot-inline .fc-bot-header {
          min-height: 72px;
          margin-left: 64px;
          padding: 12px 15px;
          border-radius: 20px 20px 0 0;
        }
        .fc-bot-inline .fc-bot-avatar {
          width: 52px;
          height: 52px;
        }
        .fc-bot-inline .fc-bot-avatar::before {
          width: 42px;
          height: 42px;
        }
        .fc-bot-inline .fc-bot-message {
          max-width: 92%;
          font-size: 14px;
        }
        .fc-bot-inline .fc-bot-messages {
          padding: 0 0 14px 64px;
        }
        .fc-bot-inline .fc-bot-suggestions {
          padding: 0 0 12px;
        }
        .fc-bot-inline .fc-bot-suggestion {
          min-height: 70px;
          padding: 0 38px 0 72px;
          border-radius: 18px;
          font-size: 15px;
        }
        .fc-bot-inline .fc-bot-suggestion::before {
          left: 17px;
          width: 40px;
          height: 40px;
          font-size: 20px;
        }
        .fc-bot-inline .fc-bot-suggestion::after {
          right: 16px;
          font-size: 28px;
        }
        .fc-bot-inline .fc-bot-title strong {
          font-size: 15px;
        }
        .fc-bot-inline .fc-bot-title span {
          font-size: 12px;
        }
        .fc-bot-form {
          grid-template-columns: 1fr 92px;
          gap: 10px;
        }
        .fc-bot-input {
          height: 58px;
          font-size: 16px;
        }
        .fc-bot-submit {
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function buildAnswer(query) {
    const results = searchKnowledge(query);
    if (!results.length || results[0].score < 8) {
      return {
        entry: {
          category: "確認が必要です",
          title: "該当する回答が見つかりませんでした",
          answer:
            "この質問に近いマニュアル回答を見つけられませんでした。表現を変えて質問するか、FCマニュアルを確認し、判断が必要な内容は本部へ確認してください。",
          links: [{ label: "FCマニュアル", url: manualUrl }],
        },
        related: [],
      };
    }

    return {
      entry: results[0].entry,
      related: results
        .slice(1)
        .filter((result) => result.score >= 18 && result.score >= results[0].score * 0.55)
        .map((result) => result.entry),
    };
  }

  function appendMessage(messagesNode, role, content) {
    const message = createElement("div", `fc-bot-message ${role}`);

    if (typeof content === "string") {
      message.textContent = content;
    } else {
      if (content.category) message.appendChild(createElement("small", "", `${content.category} / ${content.title}`));
      message.appendChild(document.createTextNode(content.answer));

      if (content.links && content.links.length) {
        const links = createElement("div", "fc-bot-links");
        content.links.forEach((link) => {
          const anchor = createElement("a", "", link.label);
          anchor.href = link.url;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          links.appendChild(anchor);
        });
        message.appendChild(links);
      }

      if (content.related && content.related.length) {
        const related = createElement("small", "", `関連: ${content.related.map((item) => item.title).join(" / ")}`);
        related.style.marginTop = "9px";
        message.appendChild(related);
      }
    }

    messagesNode.appendChild(message);
    messagesNode.scrollTop = messagesNode.scrollHeight;
  }

  function initChatbot() {
    injectStyles();

    const mountNode = mountSelector ? document.querySelector(mountSelector) : null;
    const root = createElement("div", mountNode ? "fc-bot-root fc-bot-inline is-open" : "fc-bot-root");
    const button = createElement("button", "fc-bot-button");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<span class="fc-bot-button-icon" aria-hidden="true">?</span><span>FC質問bot</span>';

    const panel = createElement("section", "fc-bot-panel");
    panel.setAttribute("aria-label", "FCマニュアル質問bot");

    const header = createElement("header", "fc-bot-header");
    const avatar = createElement("div", "fc-bot-avatar", "FC");
    const title = createElement("div", "fc-bot-title");
    title.innerHTML = `<strong>${brandName} 質問bot</strong><span>マニュアル回答から近い内容を探します</span>`;
    const close = createElement("button", "fc-bot-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "閉じる");
    header.append(avatar, title, close);

    const messages = createElement("div", "fc-bot-messages");
    const suggestions = createElement("div", "fc-bot-suggestions");
    sampleQuestions.forEach((question) => {
      const suggestion = createElement("button", "fc-bot-suggestion", question);
      suggestion.type = "button";
      suggestion.addEventListener("click", () => ask(question));
      suggestions.appendChild(suggestion);
    });

    const form = createElement("form", "fc-bot-form");
    const input = createElement("input", "fc-bot-input");
    input.type = "text";
    input.placeholder = "質問を入力してください";
    input.autocomplete = "off";
    const submit = createElement("button", "fc-bot-submit", "▷ 送信");
    submit.type = "submit";
    form.append(input, submit);

    panel.append(header, messages, suggestions, form);
    root.append(button, panel);
    (mountNode || document.body).appendChild(root);

    function setOpen(isOpen) {
      if (mountNode) return;
      root.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) window.setTimeout(() => input.focus(), 50);
    }

    function ask(question) {
      const trimmed = question.trim();
      if (!trimmed) return;
      setOpen(true);
      appendMessage(messages, "user", trimmed);
      const result = buildAnswer(trimmed);
      appendMessage(messages, "bot", {
        ...result.entry,
        related: result.related,
      });
      suggestions.classList.add("is-hidden");
      input.value = "";
    }

    window.FcManualChatbot = {
      ask,
      open: () => setOpen(true),
    };

    button.addEventListener("click", () => setOpen(!root.classList.contains("is-open")));
    close.addEventListener("click", () => setOpen(false));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      ask(input.value);
    });

    appendMessage(messages, "bot", {
      category: "使い方",
      title: "FCマニュアル質問bot",
      answer:
        "FC運用について知りたいことを入力してください。領収書、返金保証、HPB、研修、物販、就業規則など、登録済みの回答から近い内容を返します。",
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
