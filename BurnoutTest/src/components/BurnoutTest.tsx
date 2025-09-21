import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Info,
  Heart
} from "lucide-react";

/*
  번아웃 1차·2차 통합 테스트 (단일파일 React)
  - 1차: 번아웃 위험도 선별 (Likert 1~5) 총점 구간으로 3등급
  - 2차: 유형 진단 (공통 상황 질문 + 5지 선다 : 과부하 / 방치 / 좌절 / 과부하+방치 / 방치+좌절)
  - 결과: 1차 등급 + 2차 유형 분포(%) + 대표 유형(또는 조합형)

  ⚙️ 구간/문항 조정은 아래 CONSTANTS에서 바로 수정하세요.
*/

// ------------------------------
// 1차 진단 설정 (총 12문항, 1~5점, 합계 12~60)
// ------------------------------
const STAGE1_QUESTIONS = [
  { id: "S1_Q1", text: "아침에 일어나면 출근(등교)하고 싶지 않다." },
  { id: "S1_Q2", text: "하루가 끝나면 완전히 지쳐서 아무것도 할 수 없다." },
  { id: "S1_Q3", text: "업무·공부 성과가 눈에 띄게 떨어진 것 같다." },
  { id: "S1_Q4", text: "동료·고객·주변 사람과의 대화가 피곤하고 귀찮다." },
  { id: "S1_Q5", text: "쉬는 시간에도 계속 업무·공부 생각을 한다." },
  { id: "S1_Q6", text: "스스로 무능력하다고 느낀다." },
  { id: "S1_Q7", text: "출근길(등굣길)에 몸이 무겁고 피곤하다." },
  { id: "S1_Q8", text: "주말이 지나도 피로가 풀리지 않는다." },
  { id: "S1_Q9", text: "최근 일의 의미가 점점 사라진 것 같다." },
  { id: "S1_Q10", text: "노력해도 인정받지 못한다고 느낀다." },
  { id: "S1_Q11", text: "'더 해야 한다'는 압박감 때문에 불안하다." },
  { id: "S1_Q12", text: "일의 미래가 보이지 않아 회의감이 든다." },
];

// 등급 경계값 (총점 12~60)
const STAGE1_BANDS = [
  { label: "번아웃 위험 낮음", min: 12, max: 24, color: "#16a34a", bgColor: "bg-success-50", borderColor: "border-success-200" },
  { label: "경도 번아웃 가능성", min: 25, max: 40, color: "#f59e0b", bgColor: "bg-warning-50", borderColor: "border-warning-200" },
  { label: "번아웃 위험 (상담 필요)", min: 41, max: 60, color: "#dc2626", bgColor: "bg-danger-50", borderColor: "border-danger-200" },
];

const LIKERT5 = [
  { value: 1, label: "1 전혀 아니다", color: "text-success-600" },
  { value: 2, label: "2 거의 아니다", color: "text-success-500" },
  { value: 3, label: "3 보통이다", color: "text-secondary-600" },
  { value: 4, label: "4 그렇다", color: "text-warning-600" },
  { value: 5, label: "5 매우 그렇다", color: "text-danger-600" },
];

// ------------------------------
// 2차 진단 설정 (공통 상황 10문항 권장)
// 각 문항 옵션: O(과부하), N(방치), F(좌절), ON(과부하+방치), NF(방치+좌절)
// 가중치: 단일=1, 조합=0.5씩 분배
// ------------------------------
const STAGE2_QUESTIONS = [
  {
    id: "T2_Q1",
    text: "업무가 몰릴 때, 나의 기본 반응은?",
    choices: [
      { key: "O", label: "더 몰아붙여서라도 끝낸다 (쉬면 불안)" },
      { key: "N", label: "해도 달라질 게 없다고 느껴 손이 안 간다" },
      { key: "F", label: "이게 무슨 의미가 있나 회의감이 든다" },
      { key: "ON", label: "해야 하지만 인정 못 받을 것 같아 지친다" },
      { key: "NF", label: "의미도 없고 인정도 못 받는 기분이다" },
    ],
  },
  {
    id: "T2_Q2",
    text: "주말의 나를 가장 잘 설명하는 말은?",
    choices: [
      { key: "O", label: "쉬면 뒤처질까 불안해서 일 관련 정리한다" },
      { key: "N", label: "충전해도 월요일이면 다시 방전될 것 같다" },
      { key: "F", label: "무엇을 해도 의미가 잘 느껴지지 않는다" },
      { key: "ON", label: "해야 할 건 많지만 동력은 잘 안 붙는다" },
      { key: "NF", label: "일도 싫고, 한다고 달라질 것도 없다" },
    ],
  },
  {
    id: "T2_Q3",
    text: "성과 피드백을 받았을 때 드는 생각은?",
    choices: [
      { key: "O", label: "더 잘하려면 쉬면 안 된다" },
      { key: "N", label: "열심히 해도 인정 못 받는구나" },
      { key: "F", label: "내가 진짜 원하는 길이 맞나?" },
      { key: "ON", label: "해야 하지만 어차피 인정은 못 받을 듯" },
      { key: "NF", label: "인정도 의미도 없다는 생각이 든다" },
    ],
  },
  {
    id: "T2_Q4",
    text: "동료가 퇴근 후 쉬라고 할 때 나의 반응은?",
    choices: [
      { key: "O", label: "불안해서 조금 더 일한다" },
      { key: "N", label: "쉬어도 내일 변화 없을 것 같아 무덤덤" },
      { key: "F", label: "쉬어도 방향이 없으니 공허하다" },
      { key: "ON", label: "쉬고 싶지만 성과 압박과 인정 갈증이 섞인다" },
      { key: "NF", label: "쉬어도 의미 없고 인정도 없다" },
    ],
  },
  {
    id: "T2_Q5",
    text: "프로젝트 초기 단계에서 가장 큰 고민은?",
    choices: [
      { key: "O", label: "완벽하게 해낼 수 있을지 불안하다" },
      { key: "N", label: "내가 해도 결과는 똑같을 것 같다" },
      { key: "F", label: "이게 내 커리어/가치와 맞는가?" },
      { key: "ON", label: "성과도 중요하지만 인정받을 수 있을까?" },
      { key: "NF", label: "애써도 의미도 인정도 못 얻을 듯하다" },
    ],
  },
  {
    id: "T2_Q6",
    text: "업무 중 집중이 깨질 때 가장 가까운 이유는?",
    choices: [
      { key: "O", label: "더 해야 한다는 압박으로 과몰입/불안" },
      { key: "N", label: "무기력과 체념으로 손이 멈춘다" },
      { key: "F", label: "의미 상실로 집중이 어려움" },
      { key: "ON", label: "해야 하지만 인정받지 못할 듯해 동력이 약함" },
      { key: "NF", label: "의미도 인정도 없어 집중이 풀린다" },
    ],
  },
  {
    id: "T2_Q7",
    text: "야근이 잦아질 때 마음 상태는?",
    choices: [
      { key: "O", label: "그래도 성과 내려면 버텨야 한다" },
      { key: "N", label: "버텨도 달라질 게 없다" },
      { key: "F", label: "내가 원하는 삶과 멀어지는 느낌" },
      { key: "ON", label: "버텨야 하지만 인정도 못 받을 것 같다" },
      { key: "NF", label: "버텨도 의미·인정 모두 없다" },
    ],
  },
  {
    id: "T2_Q8",
    text: "성과를 낸 후 하루, 나는 보통…",
    choices: [
      { key: "O", label: "더 달려야 한다고 느낀다 (쉬면 불안)" },
      { key: "N", label: "다음엔 운이 없으면 못 할 듯하다" },
      { key: "F", label: "왜 이렇게까지 해야 했지? 의미가 의문" },
      { key: "ON", label: "또 해내야 하는데 인정 받을진 모르겠다" },
      { key: "NF", label: "성과도 결국 별 의미·인정이 없다" },
    ],
  },
  {
    id: "T2_Q9",
    text: "새 목표를 세울 때 가장 먼저 떠오르는 생각은?",
    choices: [
      { key: "O", label: "완벽한 계획과 몰입으로 밀어붙이자" },
      { key: "N", label: "해도 큰 변화는 없을 것 같다" },
      { key: "F", label: "이 목표가 내 가치와 맞는가?" },
      { key: "ON", label: "성과도 중요하고 인정도 받아야 한다" },
      { key: "NF", label: "의미도 희미하고 인정도 기대 안 한다" },
    ],
  },
  {
    id: "T2_Q10",
    text: "팀/상사와 갈등 시 드는 생각은?",
    choices: [
      { key: "O", label: "내가 더 잘해야 한다는 부담이 커진다" },
      { key: "N", label: "어차피 바뀌지 않는다 (체념)" },
      { key: "F", label: "여기서 내 성장이 가능한가?" },
      { key: "ON", label: "성과·인정 모두 불안정해 더 지친다" },
      { key: "NF", label: "의미 없고 인정도 못 받을 갈등 같다" },
    ],
  },
];

// 선택 가중치: 단일 1점, 조합 0.5+0.5
const STAGE2_WEIGHTS: Record<string, Partial<Record<"overload" | "neglect" | "frustration", number>>> = {
  O: { overload: 1 },
  N: { neglect: 1 },
  F: { frustration: 1 },
  ON: { overload: 0.5, neglect: 0.5 },
  NF: { neglect: 0.5, frustration: 0.5 },
};

const TYPE_LABEL: Record<"overload" | "neglect" | "frustration", string> = {
  overload: "과부하형",
  neglect: "방치형",
  frustration: "좌절형",
};

const TYPE_DESC: Record<keyof typeof TYPE_LABEL, string> = {
  overload:
    "끊임없이 더 많이, 더 완벽하게 해야 한다는 압박이 큽니다. '쉬면 뒤처진다'는 불안으로 과로·자기희생이 반복됩니다.",
  neglect:
    "노력 대비 인정·보상이 부족하다고 느끼며 무기력과 냉소가 쌓입니다. 효능감 저하와 회피가 나타나기 쉽습니다.",
  frustration:
    "기대와 현실의 괴리가 크고, 일의 의미·목표가 흐려집니다. 동기 상실과 방향성 혼란이 핵심입니다.",
};

const TYPE_ICONS: Record<keyof typeof TYPE_LABEL, React.ReactNode> = {
  overload: <TrendingUp className="h-5 w-5" />,
  neglect: <AlertCircle className="h-5 w-5" />,
  frustration: <Heart className="h-5 w-5" />,
};

// ------------------------------
// 공용 컴포넌트
// ------------------------------
function Progress({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-secondary-600 mb-2">
        <span>진행도</span>
        <span>
          {current}/{total} ({pct}%)
        </span>
      </div>
      <div className="progress-bar">
        <motion.div 
          className="progress-fill" 
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function StagePill({ active, children, icon }: { active?: boolean; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <motion.div
      className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
        active 
          ? "bg-primary-600 text-white border-primary-600 shadow-glow" 
          : "bg-white text-secondary-600 border-secondary-300 hover:border-primary-300"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.div>
  );
}

// ------------------------------
// 메인
// ------------------------------
export const BurnoutTest: React.FC = () => {
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  // 1차 상태
  const [s1, setS1] = useState<Record<string, number>>({});

  const s1Total = useMemo(() =>
    STAGE1_QUESTIONS.reduce((sum, q) => sum + (s1[q.id] || 0), 0),
  [s1]);

  const s1Band = useMemo(() => {
    return (
      STAGE1_BANDS.find((b) => s1Total >= b.min && s1Total <= b.max) || null
    );
  }, [s1Total]);

  const s1All = Object.keys(s1).length === STAGE1_QUESTIONS.length;

  // 2차 상태
  const [s2, setS2] = useState<Record<string, string>>({}); // key: questionId -> choice.key
  const s2All = Object.keys(s2).length === STAGE2_QUESTIONS.length;

  const s2Scores = useMemo(() => {
    const acc = { overload: 0, neglect: 0, frustration: 0 } as Record<
      keyof typeof TYPE_LABEL,
      number
    >;
    for (const q of STAGE2_QUESTIONS) {
      const key = s2[q.id];
      if (!key) continue;
      const w = STAGE2_WEIGHTS[key];
      if (!w) continue;
      for (const t of Object.keys(w) as Array<keyof typeof TYPE_LABEL>) {
        acc[t] += w[t] || 0;
      }
    }
    return acc;
  }, [s2]);

  const s2Total = useMemo(() =>
    Object.values(s2Scores).reduce((a, b) => a + b, 0),
  [s2Scores]);

  const distribution = useMemo(() => {
    const entries = Object.entries(s2Scores) as Array<[
      keyof typeof TYPE_LABEL,
      number
    ]>;
    const dist = entries.map(([k, v]) => ({
      key: k,
      label: TYPE_LABEL[k],
      value: v,
      pct: s2Total === 0 ? 0 : Math.round((v / s2Total) * 100),
    }));
    dist.sort((a, b) => b.value - a.value);
    return dist;
  }, [s2Scores, s2Total]);

  const top = distribution[0];
  const second = distribution[1];

  // 대표 유형 판정: 1위와 2위 차이가 10%p 이하면 조합형 표기
  const primaryLabel = useMemo(() => {
    if (!top) return "";
    if (second && Math.abs(top.pct - second.pct) <= 10) {
      return `${top.label} + ${second.label}`;
    }
    return top.label;
  }, [top, second]);

  const resetAll = () => {
    setStage(1);
    setS1({});
    setS2({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
          번아웃 1차·2차 통합 테스트
        </h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          1차 진단으로 번아웃 위험도를 확인하고, 이어서 2차 진단으로 유형 분포를 확인하세요.
        </p>
        <p className="text-sm text-secondary-500 mt-2">
          과부하형, 방치형, 좌절형 등 다양한 번아웃 유형을 정확히 진단합니다.
        </p>
      </motion.div>

      {/* 단계 표시 */}
      <div className="flex justify-center gap-3 mb-8">
        <StagePill active={stage === 1} icon={<Brain className="h-4 w-4" />}>
          1차 진단
        </StagePill>
        <StagePill active={stage === 2} icon={<Target className="h-4 w-4" />}>
          2차 진단
        </StagePill>
        <StagePill active={stage === 3} icon={<CheckCircle className="h-4 w-4" />}>
          종합 결과
        </StagePill>
      </div>

      <AnimatePresence mode="wait">
        {stage === 1 && (
          <motion.section
            key="stage1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Progress current={Object.keys(s1).length} total={STAGE1_QUESTIONS.length} />
            </div>
            
            <div className="space-y-6">
              {STAGE1_QUESTIONS.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-lg mb-4 text-secondary-900">{q.text}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {LIKERT5.map((c) => (
                          <motion.label
                            key={c.value}
                            className={`inline-flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all duration-200 ${
                              s1[q.id] === c.value
                                ? "border-primary-500 bg-primary-50 shadow-md"
                                : "border-secondary-200 bg-white hover:border-primary-300 hover:shadow-sm"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              className="hidden"
                              value={c.value}
                              onChange={() => setS1((prev) => ({ ...prev, [q.id]: c.value }))}
                              checked={s1[q.id] === c.value}
                            />
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              s1[q.id] === c.value 
                                ? "border-primary-600 bg-primary-600" 
                                : "border-secondary-300"
                            }`}>
                              {s1[q.id] === c.value && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <span className={`text-sm font-medium ${
                              s1[q.id] === c.value ? "text-primary-700" : c.color
                            }`}>
                              {c.label}
                            </span>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <motion.button 
                onClick={resetAll} 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                초기화
              </motion.button>
              
              <motion.button
                disabled={!s1All}
                onClick={() => setStage(2)}
                className={`btn ${s1All ? "btn-primary" : "bg-secondary-300 text-secondary-500 cursor-not-allowed"}`}
                whileHover={s1All ? { scale: 1.05 } : {}}
                whileTap={s1All ? { scale: 0.95 } : {}}
              >
                {s1All ? (
                  <>
                    <span>1차 결과 보기 & 2차로 진행</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  "모든 문항에 응답하세요"
                )}
              </motion.button>
            </div>

            {/* 1차 결과 미리보기 */}
            <AnimatePresence>
              {s1All && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-6 card p-6 ${s1Band?.bgColor || "bg-secondary-50"} border-2 ${s1Band?.borderColor || "border-secondary-200"}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="h-5 w-5 text-primary-600" />
                    <h3 className="font-semibold text-lg">1차 진단 결과</h3>
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">총점 {s1Total} / 60</p>
                  {s1Band && (
                    <p className="text-xl font-semibold" style={{ color: s1Band.color }}>
                      {s1Band.label}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {stage === 2 && (
          <motion.section
            key="stage2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Progress current={Object.keys(s2).length} total={STAGE2_QUESTIONS.length} />
            </div>
            
            <div className="space-y-6">
              {STAGE2_QUESTIONS.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-lg mb-4 text-secondary-900">{q.text}</div>
                      <div className="grid grid-cols-1 gap-3">
                        {q.choices.map((c) => (
                          <motion.label
                            key={c.key}
                            className={`inline-flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all duration-200 ${
                              s2[q.id] === c.key
                                ? "border-secondary-600 bg-secondary-50 shadow-md"
                                : "border-secondary-200 bg-white hover:border-secondary-400 hover:shadow-sm"
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              className="hidden"
                              value={c.key}
                              onChange={() => setS2((prev) => ({ ...prev, [q.id]: c.key }))}
                              checked={s2[q.id] === c.key}
                            />
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              s2[q.id] === c.key 
                                ? "border-secondary-600 bg-secondary-600" 
                                : "border-secondary-300"
                            }`}>
                              {s2[q.id] === c.key && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                            <span className={`text-sm font-medium ${
                              s2[q.id] === c.key ? "text-secondary-700" : "text-secondary-600"
                            }`}>
                              {c.label}
                            </span>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <motion.button 
                onClick={() => setStage(1)} 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                1차로 돌아가기
              </motion.button>
              
              <motion.button
                disabled={!s2All}
                onClick={() => setStage(3)}
                className={`btn ${s2All ? "btn-primary" : "bg-secondary-300 text-secondary-500 cursor-not-allowed"}`}
                whileHover={s2All ? { scale: 1.05 } : {}}
                whileTap={s2All ? { scale: 0.95 } : {}}
              >
                {s2All ? (
                  <>
                    <span>종합 결과 보기</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  "모든 문항에 응답하세요"
                )}
              </motion.button>
            </div>
          </motion.section>
        )}

        {stage === 3 && (
          <motion.section
            key="stage3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-success-100 text-success-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle className="h-4 w-4" />
                검사 완료
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                번아웃 진단 결과
              </h2>
              <p className="text-secondary-600">
                당신의 번아웃 유형과 위험도를 확인해보세요.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 1차 요약 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`card p-6 ${s1Band?.bgColor || "bg-secondary-50"} border-2 ${s1Band?.borderColor || "border-secondary-200"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-5 w-5 text-primary-600" />
                  <h3 className="font-semibold text-lg">1차 진단 결과</h3>
                </div>
                <p className="text-sm text-secondary-600 mb-3">총점 {s1Total} / 60</p>
                {s1Band ? (
                  <div>
                    <p className="text-xl font-semibold mb-2" style={{ color: s1Band.color }}>
                      {s1Band.label}
                    </p>
                    <div className="w-full h-2 bg-secondary-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: s1Band.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((s1Total - s1Band.min) / (s1Band.max - s1Band.min)) * 100}%` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-secondary-500">등급 계산에 실패했습니다.</p>
                )}
                <p className="text-xs text-secondary-500 mt-4">
                  ※ 1차는 자기보고식 선별 도구이며, 임상 진단을 대체하지 않습니다.
                </p>
              </motion.div>

              {/* 2차 분포 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-secondary-600" />
                  <h3 className="font-semibold text-lg">2차 유형 분포</h3>
                </div>
                <div className="space-y-4 mb-6">
                  {(["overload", "neglect", "frustration"] as const).map((k) => {
                    const item = distribution.find((d) => d.key === k) || {
                      key: k,
                      label: TYPE_LABEL[k],
                      pct: 0,
                      value: 0,
                    };
                    return (
                      <div key={k}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{item.label}</span>
                          <span className="font-semibold">{item.pct}%</span>
                        </div>
                        <div className="progress-bar">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.pct}%` }}
                            transition={{ delay: 0.6 + (["overload", "neglect", "frustration"].indexOf(k) * 0.1), duration: 0.8 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 rounded-xl bg-secondary-50 border border-secondary-200">
                  <div className="text-sm text-secondary-600 mb-1">대표 판정</div>
                  <div className="text-xl font-bold text-secondary-900">
                    {primaryLabel || "데이터 없음"}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 유형 설명 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary-600" />
                유형 해설
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {(["overload", "neglect", "frustration"] as const).map((k) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (["overload", "neglect", "frustration"].indexOf(k) * 0.1) }}
                    className="rounded-xl border border-secondary-200 p-4 bg-gradient-to-br from-white to-secondary-50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-primary-600">{TYPE_ICONS[k]}</div>
                      <div className="font-medium text-secondary-900">{TYPE_LABEL[k]}</div>
                    </div>
                    <div className="text-sm text-secondary-600 leading-relaxed whitespace-pre-line">
                      {TYPE_DESC[k]}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-xs text-secondary-500 mt-6 text-center">
                출처: Maslach Burnout Inventory (MBI), Christina Maslach & Susan E. Jackson, 1981. (한국 상황에 맞춰 재구성)
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-4">
              <motion.button 
                onClick={() => setStage(2)} 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                2차로 돌아가기
              </motion.button>
              
              <motion.button 
                onClick={resetAll} 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                다시 시작
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
