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
      keywords: ["プレオープン", "初回", "クーポン", "HPB", "ホットペッパー", "4,980", "1,980", "特別価格", "いくら", "金額", "価格", "出せる"],
      answer:
        "結論、HPBクーポンは基本的に通常の4,980円クーポンでの掲載を推奨しています。知人や紹介の方こそ、応援やお祝いの気持ちも含め、適正価格で来店いただけるケースが多いためです。プレオープン期間限定で特別クーポンを追加する場合は、1,980円までであれば可能です。その他のクーポン追加や特別価格設定を希望する場合は、事前に本部へ確認してください。",
      structured: {
        title: "HPBクーポン",
        conclusion: "通常掲載は4,980円を推奨しています。",
        reason: "知人・紹介のお客様は、応援やお祝いの意味もあり、通常価格で来店いただけるケースが多いためです。",
        note: "プレオープン限定は1,980円まで設定可能です。それ以外の特別価格や独自クーポンは本部確認が必要です。",
        detail:
          "基本は4,980円掲載を推奨しています。プレオープン期間限定で特別クーポンを追加する場合のみ、1,980円まで可能です。その他のクーポン追加や特別価格設定は、事前に本部へ確認してください。",
        nextQuestions: ["HPB写真は何枚必要ですか？", "口コミ目標はありますか？", "ランキングを上げるには？", "広告費はいくらですか？"],
      },
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

  const popularQuestions = [
    { label: "HPB", icon: "▱", question: "HPBのクーポンはいくらまで出せますか？" },
    { label: "広告", icon: "▥", question: "広告の指標について教えてください" },
    { label: "研修", icon: "▵", question: "研修を欠席した場合はどうすればいいですか？" },
    { label: "契約", icon: "▤", question: "契約まわりで確認することは？" },
    { label: "採用", icon: "♙", question: "入社前テストについて教えてください" },
    { label: "物販", icon: "▢", question: "物販インセンティブについて教えてください" },
    { label: "返金保証", icon: "◇", question: "返金保証の条件を教えてください" },
    { label: "就業規則", icon: "▣", question: "就業規則について教えてください" },
  ];

  const defaultNextQuestions = ["HPB写真は何枚必要ですか？", "口コミ目標はありますか？", "広告費はいくらですか？", "契約まわりで確認することは？"];

  const categorySuggestions = {
    HPB: ["HPBのクーポンはいくらまで出せますか？", "口コミ目標はありますか？", "HPB写真は何枚必要ですか？"],
    広告: ["広告の指標について教えてください", "広告費はいくらですか？", "CPAとは何ですか？"],
    研修: ["研修を欠席した場合はどうすればいいですか？", "入社前テストについて教えてください", "4日間研修後のテストについて教えてください"],
    契約: ["返金保証の条件を教えてください", "契約まわりで確認することは？", "無料施術をしてもいいですか？"],
    採用: ["入社前テストについて教えてください", "研修を欠席した場合はどうすればいいですか？", "スタッフのヘルプ費用を教えてください"],
    物販: ["物販インセンティブについて教えてください", "アイケアグラスの料金を教えてください", "メモリックは子どもも飲めますか？"],
    返金保証: ["返金保証の条件を教えてください", "視力変化が少ない場合は返金対象ですか？", "返金対象外になる条件は？"],
    就業規則: ["就業規則について教えてください", "お盆休みはどうなりますか？", "アニバーサリー休暇について教えてください"],
  };

  const initialFaqs = [
    "HPBクーポンはいくらまで設定できますか？",
    "返金保証の条件を教えてください",
    "研修を欠席した場合はどうなりますか？",
    "広告の指標について教えてください",
    "物販インセンティブについて教えてください",
    "就業規則について教えてください",
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
        --fc-shadow: 0 18px 48px rgba(48, 92, 154, 0.12);
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
        display: flex;
        flex-direction: column;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }
      .fc-bot-root.has-chat .fc-bot-panel {
        min-height: 0;
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
        display: none;
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
        order: 4;
        display: none;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        padding: 7px 9px 16px;
        background: transparent;
      }
      .fc-bot-root.has-chat .fc-bot-messages {
        order: 1;
        display: block;
      }
      .fc-bot-message {
        max-width: 100%;
        margin: 0 0 10px;
        padding: 16px;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 16px 36px rgba(48, 92, 154, 0.1);
        font-size: 14px;
        line-height: 1.75;
        white-space: pre-wrap;
      }
      .fc-bot-message.user {
        margin-left: auto;
        max-width: 86%;
        border-bottom-right-radius: 8px;
        background: linear-gradient(135deg, #4e92f3 0%, #0967df 100%);
        color: #fff;
      }
      .fc-bot-inline .fc-bot-message {
        font-size: 16px;
      }
      .fc-bot-inline .fc-bot-message.user {
        background: linear-gradient(135deg, #4e92f3 0%, #0967df 100%);
        color: #fff;
        border-radius: 22px 22px 8px 22px;
      }
      .fc-bot-message.bot {
        position: relative;
        padding: 0;
        background: transparent;
        box-shadow: none;
        border-radius: 24px;
      }
      .fc-bot-message.bot::before {
        content: none;
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
        order: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding: 10px 19px 18px;
        background: transparent;
      }
      .fc-bot-suggestions::before {
        content: "カテゴリから探す";
        width: 100%;
        display: block;
        margin: 8px 0 2px;
        color: var(--fc-ink);
        font-size: 18px;
        font-weight: 900;
      }
      .fc-bot-suggestions.is-hidden {
        display: none;
      }
      .fc-bot-root.has-chat .fc-bot-suggestions {
        display: none;
      }
      .fc-bot-suggestions::-webkit-scrollbar {
        display: none;
      }
      .fc-bot-suggestion {
        border: 1px solid var(--fc-border);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.92);
        color: var(--fc-ink);
        min-height: 58px;
        width: calc(50% - 4px);
        padding: 0 12px;
        font: inherit;
        font-size: 15px;
        font-weight: 800;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 10px 24px rgba(48, 92, 154, 0.08);
      }
      .fc-bot-suggestion-icon {
        margin-right: 7px;
        color: var(--fc-line-dark);
        font-size: 18px;
      }
      .fc-home-faq {
        order: 3;
        margin: 6px 19px 20px;
        padding: 18px 16px 14px;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0 14px 34px rgba(48, 92, 154, 0.08);
      }
      .fc-bot-root.has-chat .fc-home-faq {
        display: none;
      }
      .fc-home-faq h2 {
        margin: 0 0 12px;
        color: var(--fc-ink);
        font-size: 18px;
        line-height: 1.4;
      }
      .fc-home-faq-list {
        display: grid;
      }
      .fc-home-faq button {
        min-height: 50px;
        border: 0;
        border-top: 1px solid #e2e8f0;
        background: transparent;
        color: var(--fc-ink);
        padding: 0;
        font: inherit;
        font-size: 15px;
        text-align: left;
        cursor: pointer;
      }
      .fc-home-faq button::after {
        content: "›";
        float: right;
        color: #64748b;
        font-size: 28px;
        line-height: 1;
      }
      .fc-home-more {
        color: var(--fc-line-dark) !important;
        font-weight: 900;
      }
      .fc-home-note {
        order: 5;
        margin: 0 19px 18px;
        padding: 18px;
        border-radius: 18px;
        background: linear-gradient(135deg, #e8f3ff 0%, #ddebff 100%);
        color: #1449a6;
        line-height: 1.7;
        font-weight: 700;
      }
      .fc-bot-root.has-chat .fc-home-note {
        display: none;
      }
      .fc-category-candidates {
        width: 100%;
        display: grid;
        gap: 8px;
        padding: 3px 0 0;
      }
      .fc-category-candidates button {
        min-height: 42px;
        border: 1px solid var(--fc-border);
        border-radius: 14px;
        background: #fff;
        color: var(--fc-line-dark);
        font: inherit;
        font-size: 14px;
        font-weight: 800;
        text-align: left;
        padding: 0 14px;
        cursor: pointer;
      }
      .fc-thinking {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: var(--fc-muted);
        font-weight: 800;
      }
      .fc-thinking-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--fc-line);
        animation: fcPulse 1s ease-in-out infinite;
      }
      .fc-thinking-dot:nth-child(2) {
        animation-delay: 0.15s;
      }
      .fc-thinking-dot:nth-child(3) {
        animation-delay: 0.3s;
      }
      @keyframes fcPulse {
        0%, 100% { opacity: 0.35; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-3px); }
      }
      .fc-bot-form {
        order: 1;
        margin: 0 0 8px;
        display: grid;
        grid-template-columns: 1fr 54px 74px;
        gap: 9px;
        padding: 28px 19px 20px;
        border-radius: 0 0 24px 24px;
        background: #fff;
        box-shadow: 0 18px 42px rgba(48, 92, 154, 0.08);
      }
      .fc-bot-root.has-chat .fc-bot-form {
        order: 2;
        position: sticky;
        bottom: 0;
        margin: 0;
        padding: 10px 15px max(14px, env(safe-area-inset-bottom));
        border-radius: 0;
        background: rgba(244, 248, 255, 0.94);
        backdrop-filter: blur(12px);
      }
      .fc-bot-form::before {
        content: "何についてお困りですか？";
        grid-column: 1 / -1;
        margin-bottom: 10px;
        color: var(--fc-ink);
        font-size: 18px;
        font-weight: 900;
      }
      .fc-bot-root.has-chat .fc-bot-form::before {
        content: none;
      }
      .fc-bot-form::after {
        content: "例：HPBクーポンはいくらまで設定できますか？";
        grid-column: 1 / -1;
        color: #8a96aa;
        font-size: 14px;
        font-weight: 700;
        padding: 4px 0 0 8px;
      }
      .fc-bot-root.has-chat .fc-bot-form::after {
        content: none;
      }
      .fc-bot-input {
        min-width: 0;
        height: 58px;
        border: 1px solid var(--fc-border);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.95);
        padding: 0 18px;
        font: inherit;
        font-size: 16px;
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
        border-radius: 20px;
        background: linear-gradient(135deg, #3f8df4 0%, #0867df 100%);
        color: #fff;
        font: inherit;
        font-weight: 800;
        font-size: 18px;
        cursor: pointer;
        box-shadow: 0 12px 26px rgba(72, 122, 205, 0.28);
      }
      .fc-bot-voice {
        min-width: 0;
        border: 1px solid var(--fc-border);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        color: #0f172a;
        font: inherit;
        font-size: 19px;
        cursor: pointer;
        box-shadow: 0 10px 22px rgba(48, 92, 154, 0.08);
      }
      .fc-answer {
        display: grid;
        gap: 0;
      }
      .fc-answer-card {
        padding: 18px 17px;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 16px 36px rgba(48, 92, 154, 0.1);
      }
      .fc-answer-title {
        margin: 0 0 14px;
        color: var(--fc-ink);
        font-size: 21px;
        line-height: 1.45;
        font-weight: 900;
      }
      .fc-answer-block {
        display: grid;
        gap: 7px;
        padding: 13px 0 15px;
        border-top: 1px solid #d7dfec;
      }
      .fc-answer-title + .fc-answer-block {
        border-top: 0;
        padding-top: 0;
      }
      .fc-answer-label {
        color: var(--fc-line-dark);
        font-size: 16px;
        font-weight: 900;
      }
      .fc-answer-value {
        color: var(--fc-ink);
        font-size: 16px;
        font-weight: 500;
        line-height: 1.75;
        white-space: pre-line;
      }
      .fc-answer-value strong {
        font-size: 22px;
      }
      .fc-answer-details {
        border-top: 1px solid var(--fc-border);
        padding-top: 14px;
      }
      .fc-answer-details summary {
        color: var(--fc-line-dark);
        font-weight: 900;
        font-size: 16px;
        cursor: pointer;
      }
      .fc-answer-details p {
        margin: 9px 0 0;
        color: #4b5563;
        line-height: 1.75;
        white-space: pre-line;
      }
      .fc-next-title {
        margin: 18px 0 10px;
        color: var(--fc-muted);
        font-size: 18px;
        font-weight: 900;
      }
      .fc-next-list {
        margin-bottom: 18px;
        padding: 13px 18px;
        display: grid;
        gap: 8px;
        border-radius: 19px;
        background: #fff;
        box-shadow: 0 12px 28px rgba(48, 92, 154, 0.08);
      }
      .fc-next-button {
        border: 0;
        background: transparent;
        color: var(--fc-line-dark);
        padding: 0;
        font: inherit;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        cursor: pointer;
      }
      .fc-next-button::after {
        content: "▶";
        float: right;
        color: #8ab5f3;
        font-size: 12px;
        margin-top: 4px;
      }
      .fc-feedback {
        display: none;
        flex-wrap: wrap;
        gap: 8px;
        padding-top: 6px;
      }
      .fc-feedback button,
      .fc-feedback a {
        border: 1px solid var(--fc-border);
        border-radius: 999px;
        background: #fff;
        color: #4b5563;
        padding: 7px 10px;
        font: inherit;
        font-size: 12px;
        font-weight: 800;
        text-decoration: none;
        cursor: pointer;
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
          display: none;
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
          max-width: 100%;
          font-size: 14px;
        }
        .fc-bot-inline .fc-bot-messages {
          padding: 7px 9px 14px;
        }
        .fc-bot-inline .fc-bot-suggestions {
          padding: 8px 19px 18px;
        }
        .fc-bot-inline .fc-bot-suggestion {
          min-height: 56px;
          padding: 0 10px;
          border-radius: 16px;
          font-size: 15px;
        }
        .fc-bot-inline .fc-bot-title strong {
          font-size: 15px;
        }
        .fc-bot-inline .fc-bot-title span {
          font-size: 12px;
        }
        .fc-bot-form {
          grid-template-columns: 1fr 54px 74px;
          gap: 8px;
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
      nextQuestions: results[0].entry.structured?.nextQuestions || defaultNextQuestions,
    };
  }

  function createAnswerBlock(label, value) {
    const block = createElement("div", "fc-answer-block");
    block.append(createElement("div", "fc-answer-label", label));
    const body = createElement("div", "fc-answer-value");
    body.innerHTML = value;
    block.appendChild(body);
    return block;
  }

  function summarizeAnswer(content) {
    const answer = String(content.answer || "").trim();
    if (!answer) {
      return {
        title: content.title || "回答",
        conclusion: "該当する回答が見つかりませんでした。",
        reason: "質問の表現を少し変えると見つかる場合があります。",
        note: "判断が必要な内容は本部へ確認してください。",
        detail: "",
        nextQuestions: defaultNextQuestions,
      };
    }

    if (content.structured) return content.structured;

    if (content.category === "使い方") {
      return {
        title: "FC本部AIアシスタント",
        conclusion: "FC運営について何でも質問してください。",
        reason: "HPB、返金保証、研修、物販、就業規則など、登録済みの回答から近い内容を探します。",
        note: "判断が必要な内容は本部へ確認してください。",
        detail: answer,
        nextQuestions: popularQuestions.slice(0, 4).map((item) => item.question),
      };
    }

    if (content.category === "確認が必要です") {
      return {
        title: "確認が必要です",
        conclusion: "すみません、近い回答を見つけられませんでした。",
        reason: "言い方を少し変えると、近い回答が出る場合があります。",
        note: "急ぎの判断や例外対応は本部へ確認してください。",
        detail: answer,
        nextQuestions: popularQuestions.slice(0, 4).map((item) => item.question),
      };
    }

    const sentences = answer.split("。").map((sentence) => sentence.trim()).filter(Boolean);
    const first = sentences[0] || answer;
    const second = sentences[1] || "詳細は下の内容を確認してください。";
    const caution = sentences.find((sentence) => /ただし|必要|確認|注意|不可|NG|対象外/.test(sentence)) || "例外や判断が必要な場合は、本部確認がおすすめです。";

    return {
      title: content.title || content.category || "回答",
      conclusion: first.replace(/^結論、/, "").replace(/。$/, ""),
      reason: second.replace(/。$/, ""),
      note: caution.replace(/。$/, ""),
      detail: answer,
      nextQuestions: content.nextQuestions || defaultNextQuestions,
    };
  }

  function showCategoryCandidates(container, label, ask) {
    const questions = categorySuggestions[label] || [];
    container.querySelectorAll(".fc-category-candidates").forEach((node) => node.remove());
    if (!questions.length) return;

    const candidates = createElement("div", "fc-category-candidates");
    questions.forEach((question) => {
      const button = createElement("button", "", question);
      button.type = "button";
      button.addEventListener("click", () => ask(question));
      candidates.appendChild(button);
    });
    container.appendChild(candidates);
  }

  function buildFaq(ask) {
    const faq = createElement("section", "fc-home-faq");
    faq.append(createElement("h2", "", "よく聞かれる質問"));
    const list = createElement("div", "fc-home-faq-list");
    initialFaqs.slice(0, 3).forEach((question) => {
      const button = createElement("button", "", question);
      button.type = "button";
      button.addEventListener("click", () => ask(question));
      list.appendChild(button);
    });
    const more = createElement("button", "fc-home-more", "すべて見る");
    more.type = "button";
    more.addEventListener("click", () => {
      const showingAll = more.dataset.open === "true";
      list.innerHTML = "";
      initialFaqs.slice(0, showingAll ? 3 : initialFaqs.length).forEach((question) => {
        const button = createElement("button", "", question);
        button.type = "button";
        button.addEventListener("click", () => ask(question));
        list.appendChild(button);
      });
      more.dataset.open = String(!showingAll);
      more.textContent = showingAll ? "すべて見る" : "閉じる";
    });
    faq.append(list, more);
    return faq;
  }

  function appendStructuredAnswer(message, content, ask) {
    const data = summarizeAnswer(content);
    const wrapper = createElement("div", "fc-answer");
    const answerCard = createElement("div", "fc-answer-card");
    answerCard.append(createElement("h3", "fc-answer-title", data.title));
    answerCard.append(createAnswerBlock("✅ 結論", data.conclusion.replace(/(4,980円|1,980円|35,000円|40,000円|50,000円|80点以上|119日)/g, "<strong>$1</strong>")));
    answerCard.append(createAnswerBlock("💡 理由", data.reason));
    answerCard.append(createAnswerBlock("⚠️ 注意", data.note));

    if (data.detail) {
      const details = createElement("details", "fc-answer-details");
      details.append(createElement("summary", "", "📖 詳細を見る"));
      details.append(createElement("p", "", data.detail));
      answerCard.appendChild(details);
    }
    wrapper.appendChild(answerCard);

    const nextTitle = createElement("div", "fc-next-title", "次によくある質問");
    const nextList = createElement("div", "fc-next-list");
    (data.nextQuestions || defaultNextQuestions).slice(0, 4).forEach((question) => {
      const button = createElement("button", "fc-next-button", `・${question}`);
      button.type = "button";
      button.addEventListener("click", () => ask(question));
      nextList.appendChild(button);
    });
    wrapper.append(nextTitle, nextList);

    const feedback = createElement("div", "fc-feedback");
    feedback.append(createElement("button", "", "👍 役に立った"));
    feedback.append(createElement("button", "", "👎 違った"));
    const contact = createElement("a", "", "📞 本部へ問い合わせ");
    contact.href = manualUrl;
    contact.target = "_blank";
    contact.rel = "noopener noreferrer";
    feedback.appendChild(contact);
    wrapper.appendChild(feedback);
    message.appendChild(wrapper);
  }

  function appendMessage(messagesNode, role, content, ask) {
    const message = createElement("div", `fc-bot-message ${role}`);

    if (typeof content === "string") {
      message.textContent = content;
    } else {
      appendStructuredAnswer(message, content, ask);

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

    }

    messagesNode.appendChild(message);
    messagesNode.scrollTop = messagesNode.scrollHeight;
    return message;
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
    title.innerHTML = `<strong>${brandName} AI</strong><span>FC運営について何でも質問してください</span>`;
    const close = createElement("button", "fc-bot-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "閉じる");
    header.append(avatar, title, close);

    const messages = createElement("div", "fc-bot-messages");
    const suggestions = createElement("div", "fc-bot-suggestions");
    popularQuestions.forEach((item) => {
      const suggestion = createElement("button", "fc-bot-suggestion");
      suggestion.type = "button";
      suggestion.innerHTML = `<span class="fc-bot-suggestion-icon">${item.icon}</span>${item.label}`;
      suggestion.addEventListener("click", () => showCategoryCandidates(suggestions, item.label, ask));
      suggestions.appendChild(suggestion);
    });
    const faq = buildFaq(ask);
    const homeNote = createElement("div", "fc-home-note", "すぐに解決したいことをAIがサポートします。マニュアルや規則、よくある質問から最適な回答をご案内します。");

    const form = createElement("form", "fc-bot-form");
    const input = createElement("input", "fc-bot-input");
    input.type = "text";
    input.placeholder = "質問を入力してください";
    input.autocomplete = "off";
    const voice = createElement("button", "fc-bot-voice", "🎤");
    voice.type = "button";
    voice.setAttribute("aria-label", "音声入力");
    const submit = createElement("button", "fc-bot-submit", "送信");
    submit.type = "submit";
    form.append(input, voice, submit);

    panel.append(header, form, suggestions, faq, homeNote, messages);
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
      root.classList.add("has-chat");
      appendMessage(messages, "user", trimmed, ask);
      const thinking = appendMessage(messages, "bot", "AIが考えています", ask);
      thinking.innerHTML = '<span class="fc-thinking">AIが考えています<span class="fc-thinking-dot"></span><span class="fc-thinking-dot"></span><span class="fc-thinking-dot"></span></span>';
      window.setTimeout(() => {
        const result = buildAnswer(trimmed);
        thinking.remove();
        appendMessage(messages, "bot", {
          ...result.entry,
          related: result.related,
          nextQuestions: result.nextQuestions,
        }, ask);
      }, 450);
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
    voice.addEventListener("click", () => {
      input.focus();
      input.placeholder = "音声入力は端末のマイクボタンから入力できます";
    });

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
