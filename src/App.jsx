import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Edit2, Check, X, Printer, Plus, Trash2, MessageCircle, CheckCircle2, Circle, Sparkles } from 'lucide-react';

const initialData = {
  blocks: [
    {
      id: 'emotions', name: 'Эмоции', color: '#7BA05B', bg: '#E8F0DC',
      keySkills: [
        {
          id: 'self-esteem', name: 'Самооценка',
          skills: [
            { id: 'activity', name: 'Активность',
              ideal: 'Ребенок всегда первым поднимает руку, активно задаёт вопросы, комментирует и даёт обратную связь.',
              questions: ['Поднимает ли ребёнок руку первым на занятиях?', 'Активно ли задаёт вопросы преподавателю?', 'Комментирует ли происходящее и даёт обратную связь?', 'Вовлечён ли в обсуждение и ведёт ли диалог?']
            },
            { id: 'confidence', name: 'Уверенность',
              ideal: 'Ребенок сразу говорит, если не понял, спокойно просит пояснения, отвечает уверенно и громко.',
              questions: ['Говорит ли ребёнок, если что-то не понял?', 'Просит ли пояснения спокойно и без стеснения?', 'Отвечает ли уверенно и громко?', 'Высказывает и отстаивает ли своё мнение?']
            }
          ]
        },
        {
          id: 'empathy', name: 'Эмпатия',
          skills: [
            { id: 'recognize-emotions', name: 'Умение распознавать эмоции и чувства',
              ideal: 'Ребенок точно определяет и называет свои эмоции и эмоции других, легко объясняет причины.',
              questions: ['Может ли ребёнок назвать свою эмоцию словами?', 'Распознаёт ли эмоции других людей?', 'Объясняет ли, почему человек чувствует именно так?', 'Адекватно ли реагирует на эмоции окружающих?']
            },
            { id: 'refuse', name: 'Навык отказывать',
              ideal: 'Ребенок спокойно и тактично говорит «нет», объясняет причину, защищает свои границы.',
              questions: ['Умеет ли ребёнок говорить «нет», когда не хочет?', 'Может ли отказать, не боясь обидеть?', 'Объясняет ли причину отказа спокойно?', 'Отстаивает ли свои личные границы?']
            },
            { id: 'listen-self', name: 'Навык прислушиваться к себе',
              ideal: 'Ребенок доверяет своим чувствам и интуиции, принимает решения изнутри.',
              questions: ['Прислушивается ли ребёнок к своим чувствам?', 'Доверяет ли своей интуиции при выборе?', 'Принимает ли решения исходя из внутренних ощущений?', 'Может ли отстоять своё мнение, когда оно отличается от мнения большинства?']
            }
          ]
        }
      ]
    },
    {
      id: 'thinking', name: 'Мышление', color: '#5B7BA0', bg: '#DCE4F0',
      keySkills: [
        {
          id: 'critical', name: 'Критическое мышление',
          skills: [
            { id: 'reasoning', name: 'Рассудительность',
              ideal: 'Глубоко анализирует ситуации, аргументирует мнение с примерами.',
              questions: ['Анализирует ли ребёнок ситуации глубоко?', 'Подробно высказывает свои мысли?', 'Аргументирует ли мнение примерами?', 'Участвует ли в разборе кейсов?']
            },
            { id: 'flexibility', name: 'Гибкость мышления',
              ideal: 'Легко меняет точку зрения при новых аргументах, предлагает неожиданные идеи.',
              questions: ['Меняет ли ребёнок мнение под новыми аргументами?', 'Встаёт ли на место другого человека?', 'Предлагает ли неожиданные, креативные идеи?', 'Развивает ли мысли, не совпадающие с собственными?']
            },
            { id: 'connections', name: 'Умение видеть взаимосвязи',
              ideal: 'Самостоятельно видит, как знания связаны с реальной жизнью.',
              questions: ['Видит ли ребёнок связь между знаниями и жизнью?', 'Самостоятельно ли находит взаимосвязи?', 'Объясняет ли, где пригодятся новые знания?', 'Замечает ли причинно-следственные связи?']
            },
            { id: 'choice', name: 'Умение делать выбор',
              ideal: 'Быстро и уверенно выбирает, берёт ответственность, объясняет выбор.',
              questions: ['Легко ли ребёнок выбирает из нескольких вариантов?', 'Берёт ли ответственность за свой выбор?', 'Аргументирует ли свой выбор?', 'Уверенно ли действует после принятия решения?']
            }
          ]
        },
        {
          id: 'resilience', name: 'Психологическая устойчивость (с 11 лет)',
          skills: [
            { id: 'mistakes', name: 'Умение справляться с ошибками и извлекать опыт',
              ideal: 'Спокойно относится к ошибкам, анализирует и использует опыт.',
              questions: ['Спокойно ли ребёнок относится к своим ошибкам?', 'Анализирует ли, что пошло не так?', 'Использует ли опыт ошибки в будущем?', 'Не сдаётся ли при первых неудачах?']
            }
          ]
        },
        {
          id: 'financial', name: 'Финансовое мышление',
          skills: [
            { id: 'finance', name: 'Финансовое мышление',
              ideal: 'Различает нужды и хотелки, планирует бюджет, понимает ценность денег.',
              questions: ['Отличает ли ребёнок нужды от хотелок?', 'Планирует ли расходы (откладывает, копит)?', 'Понимает ли связь между трудом и деньгами?', 'Спокойно ли относится к отсрочке желаний?']
            }
          ]
        },
        {
          id: 'ecological', name: 'Экологическое мышление (до 10 лет)',
          skills: [
            { id: 'ecology', name: 'Экологическое мышление',
              ideal: 'Бережёт ресурсы, заботится о живом мире, предлагает идеи улучшения экологии.',
              questions: ['Бережёт ли ребёнок воду, электричество, ресурсы?', 'Сортирует ли мусор, не бросает ли где попало?', 'Заботится ли о растениях и животных?', 'Видит ли связь между поведением человека и природой?']
            }
          ]
        }
      ]
    },
    {
      id: 'communication', name: 'Общение', color: '#A07B5B', bg: '#F0E4DC',
      keySkills: [
        {
          id: 'conflicts', name: 'Управление конфликтами',
          skills: [
            { id: 'conflict-mgmt', name: 'Управление конфликтами',
              ideal: 'Спокойно использует «я-высказывания», предлагает компромиссы, договаривается.',
              questions: ['Сохраняет ли ребёнок спокойствие в конфликте?', 'Использует ли «я-высказывания»?', 'Выслушивает ли другую сторону?', 'Ищет ли компромисс самостоятельно?']
            }
          ]
        },
        {
          id: 'team', name: 'Работа в команде',
          skills: [
            { id: 'teamwork', name: 'Умение работать в команде',
              ideal: 'Активно участвует в команде, распределяет роли, достигает общих целей.',
              questions: ['Активно ли ребёнок участвует в командной работе?', 'Может ли распределять роли в команде?', 'Договаривается ли с участниками для общей цели?', 'Чувствует ли себя комфортно в групповой работе?']
            }
          ]
        },
        {
          id: 'comm-friendship', name: 'Коммуникация / Построение отношений / Дружба',
          skills: [
            { id: 'defend-opinion', name: 'Умение отстаивать свою точку зрения',
              ideal: 'Спокойно и конструктивно аргументирует позицию, не сдаётся под давлением.',
              questions: ['Отстаивает ли ребёнок свою точку зрения?', 'Приводит ли аргументы и примеры?', 'Не сдаётся ли под давлением мнения других?', 'Объясняет ли причины своего выбора?']
            },
            { id: 'feedback', name: 'Навык давать конструктивную обратную связь',
              ideal: 'Даёт доброжелательную, конкретную и полезную обратную связь.',
              questions: ['Даёт ли ребёнок обратную связь корректно?', 'Использует ли «я-высказывания» вместо обвинений?', 'Конкретен ли и доброжелателен в комментариях?', 'Может ли указать на минусы тактично?']
            },
            { id: 'decentration', name: 'Навык децентрации (с 12 лет)',
              ideal: 'Легко смотрит на ситуацию глазами другого, учитывает чужие интересы.',
              questions: ['Смотрит ли ребёнок на ситуацию глазами другого?', 'Учитывает ли чужие интересы при решении?', 'Находит ли решения, выгодные всем сторонам?', 'Понимает ли, почему другой человек поступает иначе?']
            },
            { id: 'listen-others', name: 'Умение слушать других',
              ideal: 'Дослушивает до конца, не перебивает, понимает с первого раза.',
              questions: ['Дослушивает ли ребёнок до конца?', 'Не перебивает ли собеседника?', 'Понимает ли задание с первого раза?', 'Воспринимает ли информацию внимательно?']
            }
          ]
        },
        {
          id: 'self-presentation', name: 'Самопрезентация',
          skills: [
            { id: 'self-pres', name: 'Навык самопрезентации',
              ideal: 'С удовольствием выступает публично, уверенно рассказывает о себе.',
              questions: ['Любит ли ребёнок выступать на публике?', 'Уверенно ли рассказывает о себе?', 'Справляется ли со стеснением?', 'Получает ли удовольствие от презентации?']
            }
          ]
        },
        {
          id: 'agreements', name: 'Создание договорённостей',
          skills: [
            { id: 'negotiate', name: 'Умение договариваться',
              ideal: 'Находит компромисс, слышит другого, приходит к взаимовыгодному решению.',
              questions: ['Умеет ли ребёнок находить компромисс?', 'Слышит ли позицию другого?', 'Корректно ли обсуждает разногласия?', 'Приходит ли к взаимовыгодным решениям?']
            }
          ]
        }
      ]
    },
    {
      id: 'awareness', name: 'Осознанность (Действие)', color: '#A05B7B', bg: '#F0DCE4',
      keySkills: [
        {
          id: 'goals', name: 'Целеполагание, самоорганизация',
          skills: [
            { id: 'self-org', name: 'Навык самоорганизации',
              ideal: 'Самостоятельно планирует дела, помнит обязанности, всегда вовремя.',
              questions: ['Самостоятельно ли планирует свои дела?', 'Помнит ли об обязанностях и уроках?', 'Контролирует ли выполнение без напоминаний?', 'Вовремя ли подключается к занятиям?']
            },
            { id: 'priorities', name: 'Навык расставлять приоритеты',
              ideal: 'Чётко понимает важное, формулирует цели, планирует последовательность.',
              questions: ['Понимает ли ребёнок, что важно сделать первым?', 'Правильно ли формулирует свои цели?', 'Планирует ли последовательность действий?', 'Может ли отложить менее важное?']
            },
            { id: 'concentration', name: 'Навык концентрировать внимание',
              ideal: 'Полностью сосредоточен, держит внимание на задаче.',
              questions: ['Удерживает ли ребёнок внимание всё занятие?', 'Не отвлекается ли на посторонние вещи?', 'Держит ли нить разговора?', 'Концентрируется ли на задаче без напоминаний?']
            },
            { id: 'time-limit', name: 'Умение действовать в условиях ограничения времени',
              ideal: 'Спокойно и эффективно работает в ограниченное время.',
              questions: ['Успевает ли ребёнок выполнить быстрые задания?', 'Укладывается ли во временные рамки?', 'Спокойно ли работает под таймером?', 'Эффективно ли распределяет время?']
            }
          ]
        }
      ]
    },
    {
      id: 'cognitive', name: 'Когнитивные навыки', color: '#5B8FA0', bg: '#DCEAF0',
      keySkills: [
        {
          id: 'cognitive-main', name: '8 ключевых когнитивных навыков',
          skills: [
            { id: 'processing-speed', name: 'Скорость обработки информации',
              ideal: 'Ребёнок быстро понимает задание и сразу приступает к выполнению.',
              questions: ['Быстро ли ребёнок понимает суть задания?', 'Сразу ли начинает выполнять, без долгого «раскачивания»?', 'Успевает ли за темпом занятий и сверстников?', 'Быстро ли реагирует на вопросы взрослого?']
            },
            { id: 'attention', name: 'Внимание',
              ideal: 'Ребёнок легко удерживает внимание на задаче, замечает детали.',
              questions: ['Может ли удерживать внимание на одном деле 15–20 минут?', 'Замечает ли мелкие детали в заданиях и картинках?', 'Не отвлекается ли на посторонние звуки и предметы?', 'Доводит ли начатое до конца, не перескакивая?']
            },
            { id: 'logic', name: 'Логика',
              ideal: 'Ребёнок легко выстраивает логические цепочки и решает задачи на рассуждение.',
              questions: ['Решает ли ребёнок логические задачки и головоломки?', 'Объясняет ли свои выводы «потому что…»?', 'Видит ли закономерности (что идёт за чем)?', 'Может ли исключить лишнее из ряда предметов?']
            },
            { id: 'mental-flexibility', name: 'Гибкость мышления (когнитивная)',
              ideal: 'Ребёнок легко переключается между задачами и находит разные способы решения.',
              questions: ['Легко ли переключается с одного задания на другое?', 'Предлагает ли несколько вариантов решения?', 'Не «застревает» ли на одном способе, если он не работает?', 'Принимает ли новые правила игры без сопротивления?']
            },
            { id: 'spatial', name: 'Пространственное мышление',
              ideal: 'Ребёнок хорошо ориентируется в пространстве, легко работает с фигурами и схемами.',
              questions: ['Хорошо ли ориентируется на местности (дом, улица)?', 'Справляется ли с пазлами, конструкторами, лабиринтами?', 'Понимает ли «лево/право», «выше/ниже», «спереди/сзади»?', 'Может ли мысленно повернуть фигуру или представить вид сверху?']
            },
            { id: 'working-memory', name: 'Рабочая память',
              ideal: 'Ребёнок удерживает в голове инструкцию и выполняет её по шагам.',
              questions: ['Может ли запомнить инструкцию из 2–3 действий?', 'Удерживает ли в голове условие задачи, пока решает её?', 'Не забывает ли, о чём шла речь в начале разговора?', 'Считает ли в уме без записи промежуточных результатов?']
            },
            { id: 'memory', name: 'Память',
              ideal: 'Ребёнок легко запоминает информацию надолго и быстро её вспоминает.',
              questions: ['Легко ли запоминает стихи, правила, новые слова?', 'Помнит ли события, которые были недавно (вчера, неделю назад)?', 'Узнаёт ли ранее изученный материал?', 'Быстро ли вспоминает нужное, когда спрашиваешь?']
            },
            { id: 'planning', name: 'Планирование',
              ideal: 'Ребёнок продумывает шаги наперёд и доводит план до результата.',
              questions: ['Продумывает ли ребёнок порядок действий перед началом?', 'Может ли разбить большое дело на этапы?', 'Прикидывает ли заранее, сколько времени нужно?', 'Доводит ли план до результата, не сбиваясь?']
            }
          ]
        }
      ]
    },
    {
      id: 'learning', name: 'Навык учиться', color: '#8FA05B', bg: '#EAF0DC',
      keySkills: [
        {
          id: 'learning-main', name: 'Навыки учёбы',
          skills: [
            { id: 'curiosity', name: 'Любознательность',
              ideal: 'Ребёнок задаёт много вопросов, интересуется новым, сам ищет ответы.',
              questions: ['Задаёт ли ребёнок вопросы «почему» и «как это работает»?', 'Проявляет ли интерес к новым темам и явлениям?', 'Сам ли ищет ответы (в книгах, интернете, у взрослых)?', 'Радуется ли, когда узнаёт что-то новое?']
            },
            { id: 'persistence', name: 'Усидчивость',
              ideal: 'Ребёнок может долго заниматься одним делом и не бросает при сложностях.',
              questions: ['Может ли заниматься одним делом 20–30 минут без перерыва?', 'Не бросает ли задание, если оно показалось сложным?', 'Возвращается ли к незаконченному, если отвлёкся?', 'Спокойно ли относится к необходимости повторять что-то много раз?']
            },
            { id: 'info-work', name: 'Работа с информацией',
              ideal: 'Ребёнок умеет находить главное, выделять суть и пересказывать своими словами.',
              questions: ['Может ли пересказать прочитанное или услышанное своими словами?', 'Выделяет ли главное в тексте или объяснении?', 'Умеет ли искать нужное в книге, интернете, учебнике?', 'Делит ли информацию на «важное» и «второстепенное»?']
            },
            { id: 'self-learning', name: 'Самостоятельность в обучении',
              ideal: 'Ребёнок учится без постоянного контроля взрослых, сам разбирается в новом.',
              questions: ['Делает ли уроки без напоминаний и контроля?', 'Пытается ли сам разобраться в новом материале, прежде чем спросить?', 'Берётся ли за дополнительные задания по своей инициативе?', 'Может ли сам организовать своё рабочее место и время?']
            },
            { id: 'apply-knowledge', name: 'Применение знаний на практике',
              ideal: 'Ребёнок видит, где применить выученное, и использует знания в жизни.',
              questions: ['Применяет ли школьные знания в обычной жизни?', 'Приводит ли примеры из жизни, когда что-то изучает?', 'Может ли решить нестандартную задачу с помощью того, что знает?', 'Связывает ли новое с тем, что уже знает?']
            }
          ]
        }
      ]
    }
  ]
};

const getColor = (pct) => {
  if (pct >= 80) return { bar: '#7BA05B', light: '#E8F0DC', label: 'Сильная сторона' };
  if (pct >= 50) return { bar: '#E8C547', light: '#FAF3D7', label: 'Навык отстаёт в развитии' };
  return { bar: '#B85450', light: '#F4DBD9', label: 'Критический уровень' };
};

const calcPercent = (ratings) => {
  const filled = ratings.filter(r => r > 0);
  if (filled.length === 0) return null;
  const avg = filled.reduce((a, b) => a + b, 0) / filled.length;
  return Math.round((avg - 1) / 4 * 80);
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [ratings, setRatings] = useState({});
  const [included, setIncluded] = useState({});
  const [expandedBlocks, setExpandedBlocks] = useState({ emotions: true });
  const [expandedSkills, setExpandedSkills] = useState({});
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [meta, setMeta] = useState({
    parent: '', child: '', age: '',
    date: new Date().toLocaleDateString('ru-RU'),
    teacher: ''
  });

  const setRating = (skillId, qIndex, value, totalQuestions) => {
    setRatings(prev => {
      const current = prev[skillId] || new Array(totalQuestions).fill(0);
      const updated = [...current];
      updated[qIndex] = value;
      return { ...prev, [skillId]: updated };
    });
    setIncluded(prev => prev[skillId] === undefined ? { ...prev, [skillId]: true } : prev);
  };

  const toggleIncluded = (skillId) => setIncluded(prev => ({ ...prev, [skillId]: !prev[skillId] }));
  const toggleBlock = (blockId) => setExpandedBlocks(prev => ({ ...prev, [blockId]: !prev[blockId] }));
  const toggleSkill = (skillId) => setExpandedSkills(prev => ({ ...prev, [skillId]: !prev[skillId] }));

  const startEdit = (skillId, qIndex, currentText) => {
    setEditing({ skillId, qIndex });
    setEditValue(currentText);
  };

  const saveEdit = () => {
    if (!editing) return;
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      for (const block of newData.blocks)
        for (const ks of block.keySkills)
          for (const skill of ks.skills)
            if (skill.id === editing.skillId)
              skill.questions[editing.qIndex] = editValue;
      return newData;
    });
    setEditing(null);
    setEditValue('');
  };

  const deleteQuestion = (skillId, qIndex) => {
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      for (const block of newData.blocks)
        for (const ks of block.keySkills)
          for (const skill of ks.skills)
            if (skill.id === skillId)
              skill.questions.splice(qIndex, 1);
      return newData;
    });
    setRatings(prev => {
      if (!prev[skillId]) return prev;
      const updated = [...prev[skillId]];
      updated.splice(qIndex, 1);
      return { ...prev, [skillId]: updated };
    });
  };

  const addQuestion = (skillId) => {
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      for (const block of newData.blocks)
        for (const ks of block.keySkills)
          for (const skill of ks.skills)
            if (skill.id === skillId)
              skill.questions.push('Новый вопрос — нажмите карандашик, чтобы изменить');
      return newData;
    });
  };

  const allSkills = useMemo(() => {
    const list = [];
    for (const block of data.blocks)
      for (const ks of block.keySkills)
        for (const skill of ks.skills)
          list.push({ ...skill, blockColor: block.color, blockName: block.name });
    return list;
  }, [data]);

  const dashboardSkills = useMemo(() => {
    return allSkills
      .filter(s => included[s.id])
      .map(s => ({ ...s, percent: calcPercent(ratings[s.id] || []) }))
      .filter(s => s.percent !== null);
  }, [allSkills, included, ratings]);

  const handlePrint = () => window.print();

  const totalAnswered = Object.values(ratings).reduce((acc, arr) => acc + arr.filter(r => r > 0).length, 0);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: '#F7F8F5', minHeight: '100vh' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .dashboard-print { box-shadow: none !important; position: static !important; max-height: none !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.25s ease-out; }
        .rating-btn:hover { transform: scale(1.08); }
        .rating-btn { transition: all 0.15s ease; }
        input:focus, textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }
      `}</style>

      <div className="no-print" style={{
        background: 'linear-gradient(135deg, #2C5F7C 0%, #4A8BA8 100%)',
        padding: '20px 32px', color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1600, margin: '0 auto', gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px' }}>
              Диагностика гибких навыков
            </h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.85, fontSize: 14 }}>
              Прогресс: {totalAnswered} ответов · в карте {dashboardSkills.length} {dashboardSkills.length === 1 ? 'навык' : (dashboardSkills.length >= 2 && dashboardSkills.length <= 4 ? 'навыка' : 'навыков')}
            </p>
          </div>
          <button onClick={handlePrint} style={{
            background: 'white', color: '#2C5F7C', border: 'none',
            padding: '10px 20px', borderRadius: 8, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: 8, fontSize: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Printer size={18} /> Экспорт в PDF
          </button>
        </div>
      </div>

      <div className="no-print" style={{ maxWidth: 1600, margin: '0 auto', padding: '16px 24px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FFF8E1 0%, #FFE7B0 100%)',
          border: '1px solid #F0C674', borderRadius: 10,
          padding: '12px 16px', display: 'flex', gap: 12,
          alignItems: 'flex-start', fontSize: 13, color: '#5C4A1A'
        }}>
          <Sparkles size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Как пользоваться:</strong> раскройте блок → раскройте навык → задайте родителю вопросы и поставьте оценку <strong>1–5</strong> по каждому (1 = негативный сценарий, 5 = идеал). Навык автоматически появится в Диагностической карте справа. Вопросы можно редактировать <Edit2 size={11} style={{ verticalAlign: 'middle' }} />, удалять <Trash2 size={11} style={{ verticalAlign: 'middle' }} /> и добавлять свои.
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 24, padding: 24, maxWidth: 1600, margin: '0 auto'
      }}>
        <div className="no-print">
          <div style={{
            background: 'white', borderRadius: 12, padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 16
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#2C5F7C', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: '#2C5F7C', color: 'white', width: 24, height: 24,
                borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 13, fontWeight: 700
              }}>1</span>
              Информация о занятии
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Имя родителя" value={meta.parent} onChange={v => setMeta({...meta, parent: v})} />
              <Field label="Имя ребёнка" value={meta.child} onChange={v => setMeta({...meta, child: v})} />
              <Field label="Возраст ребёнка" value={meta.age} onChange={v => setMeta({...meta, age: v})} />
              <Field label="Дата занятия" value={meta.date} onChange={v => setMeta({...meta, date: v})} />
              <Field label="Преподаватель" value={meta.teacher} onChange={v => setMeta({...meta, teacher: v})} fullWidth />
            </div>
          </div>

          <h2 style={{ margin: '0 0 12px 4px', fontSize: 18, color: '#2C5F7C', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: '#2C5F7C', color: 'white', width: 24, height: 24,
              borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 13, fontWeight: 700
            }}>2</span>
            Оценка навыков
          </h2>

          {data.blocks.map(block => {
            const blockSkillCount = block.keySkills.reduce((acc, ks) => acc + ks.skills.length, 0);
            const blockAnswered = block.keySkills.reduce((acc, ks) =>
              acc + ks.skills.filter(s => (ratings[s.id] || []).some(r => r > 0)).length, 0);

            return (
              <div key={block.id} style={{
                background: 'white', borderRadius: 12, marginBottom: 12,
                overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                borderLeft: `4px solid ${block.color}`
              }}>
                <button onClick={() => toggleBlock(block.id)} style={{
                  width: '100%', background: block.bg, border: 'none',
                  padding: '14px 18px', textAlign: 'left', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 16, fontWeight: 700, color: block.color
                }}>
                  {expandedBlocks[block.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  {block.name}
                  <span style={{
                    marginLeft: 'auto', fontSize: 12, fontWeight: 600,
                    background: 'rgba(255,255,255,0.7)', padding: '4px 10px',
                    borderRadius: 12, color: block.color
                  }}>
                    {blockAnswered} / {blockSkillCount}
                  </span>
                </button>

                {expandedBlocks[block.id] && (
                  <div style={{ padding: '8px 16px 16px 16px' }}>
                    {block.keySkills.map(ks => (
                      <div key={ks.id} style={{ marginTop: 12 }}>
                        <div style={{
                          fontSize: 12, fontWeight: 700, color: '#666',
                          textTransform: 'uppercase', letterSpacing: '0.5px',
                          marginBottom: 8, paddingLeft: 4
                        }}>
                          {ks.name}
                        </div>

                        {ks.skills.map(skill => {
                          const skillRatings = ratings[skill.id] || new Array(skill.questions.length).fill(0);
                          const answeredCount = skillRatings.filter(r => r > 0).length;
                          const pct = calcPercent(skillRatings);
                          const isExpanded = expandedSkills[skill.id];
                          const isIncluded = included[skill.id];
                          const hasAnswers = answeredCount > 0;

                          return (
                            <div key={skill.id} style={{
                              border: `1.5px solid ${hasAnswers ? block.color : '#E5E7EB'}`,
                              borderRadius: 8, marginBottom: 8,
                              background: hasAnswers ? block.bg : '#FAFAFA',
                              transition: 'all 0.2s ease'
                            }}>
                              <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <button onClick={() => toggleSkill(skill.id)} style={{
                                  flex: 1, background: 'none', border: 'none',
                                  textAlign: 'left', cursor: 'pointer',
                                  display: 'flex', alignItems: 'center', gap: 8,
                                  fontSize: 14, fontWeight: 600, color: '#1F2937'
                                }}>
                                  {hasAnswers ?
                                    <CheckCircle2 size={18} style={{ color: block.color }} /> :
                                    <Circle size={18} style={{ color: '#D1D5DB' }} />}
                                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                  <span>{skill.name}</span>
                                  <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginLeft: 6 }}>
                                    ({answeredCount}/{skill.questions.length})
                                  </span>
                                </button>

                                {pct !== null && (
                                  <span style={{
                                    fontSize: 13, fontWeight: 700,
                                    color: getColor(pct).bar,
                                    background: getColor(pct).light,
                                    padding: '4px 10px', borderRadius: 12
                                  }}>
                                    {pct}%
                                  </span>
                                )}

                                <label style={{
                                  display: 'flex', alignItems: 'center', gap: 4,
                                  fontSize: 11, color: hasAnswers ? block.color : '#9CA3AF',
                                  cursor: hasAnswers ? 'pointer' : 'not-allowed',
                                  background: 'white', padding: '4px 8px',
                                  borderRadius: 6, border: `1px solid ${hasAnswers ? block.color : '#E5E7EB'}`,
                                  fontWeight: 600, opacity: hasAnswers ? 1 : 0.5
                                }}>
                                  <input
                                    type="checkbox"
                                    checked={!!isIncluded}
                                    onChange={() => hasAnswers && toggleIncluded(skill.id)}
                                    disabled={!hasAnswers}
                                    style={{
                                      width: 14, height: 14,
                                      accentColor: block.color,
                                      cursor: hasAnswers ? 'pointer' : 'not-allowed'
                                    }}
                                  />
                                  В карту
                                </label>
                              </div>

                              {isExpanded && (
                                <div className="fade-in" style={{
                                  padding: '4px 12px 14px 12px',
                                  borderTop: '1px solid rgba(0,0,0,0.06)'
                                }}>
                                  <div style={{
                                    background: 'white',
                                    borderLeft: `3px solid ${block.color}`,
                                    padding: '8px 12px', margin: '10px 0',
                                    borderRadius: 4, fontSize: 12,
                                    color: '#4A6580', fontStyle: 'italic', lineHeight: 1.4
                                  }}>
                                    <strong style={{ color: block.color, fontStyle: 'normal' }}>Идеал: </strong>
                                    {skill.ideal}
                                  </div>

                                  <div style={{
                                    fontSize: 11, color: '#6B7280',
                                    marginBottom: 8, fontWeight: 600,
                                    textTransform: 'uppercase', letterSpacing: '0.5px',
                                    display: 'flex', alignItems: 'center', gap: 6
                                  }}>
                                    <MessageCircle size={13} /> Вопросы родителю
                                  </div>

                                  {skill.questions.map((q, qIdx) => {
                                    const isEditing = editing && editing.skillId === skill.id && editing.qIndex === qIdx;
                                    const currentRating = skillRatings[qIdx] || 0;

                                    return (
                                      <div key={qIdx} style={{
                                        background: 'white', borderRadius: 8,
                                        padding: '12px 14px', marginBottom: 8,
                                        border: currentRating > 0 ? `1.5px solid ${block.color}` : '1px solid #E5E7EB'
                                      }}>
                                        {isEditing ? (
                                          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                                            <textarea
                                              value={editValue}
                                              onChange={e => setEditValue(e.target.value)}
                                              style={{
                                                flex: 1, border: `1px solid ${block.color}`,
                                                borderRadius: 4, padding: 6, fontSize: 13,
                                                fontFamily: 'inherit', resize: 'vertical', minHeight: 50
                                              }}
                                              autoFocus
                                            />
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                              <button onClick={saveEdit} style={iconBtn(block.color, 'white')}>
                                                <Check size={16} />
                                              </button>
                                              <button onClick={() => setEditing(null)} style={iconBtn('#888', 'white')}>
                                                <X size={16} />
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                                            <span style={{
                                              background: currentRating > 0 ? block.color : '#E5E7EB',
                                              color: currentRating > 0 ? 'white' : '#6B7280',
                                              width: 22, height: 22, borderRadius: '50%',
                                              display: 'inline-flex', alignItems: 'center',
                                              justifyContent: 'center', fontSize: 12,
                                              fontWeight: 700, flexShrink: 0
                                            }}>
                                              {qIdx + 1}
                                            </span>
                                            <div style={{ flex: 1, fontSize: 14, color: '#1F2937', lineHeight: 1.45, fontWeight: 500 }}>
                                              {q}
                                            </div>
                                            <button onClick={() => startEdit(skill.id, qIdx, q)} style={iconBtnSmall} title="Редактировать">
                                              <Edit2 size={13} />
                                            </button>
                                            <button onClick={() => deleteQuestion(skill.id, qIdx)} style={{...iconBtnSmall, color: '#B85450'}} title="Удалить">
                                              <Trash2 size={13} />
                                            </button>
                                          </div>
                                        )}

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 30 }}>
                                          <span style={{ fontSize: 10, color: '#B85450', fontWeight: 600, minWidth: 56 }}>
                                            Негатив
                                          </span>
                                          <div style={{ display: 'flex', gap: 5, flex: 1, justifyContent: 'center' }}>
                                            {[1, 2, 3, 4, 5].map(val => {
                                              const isActive = currentRating === val;
                                              const valColor = val <= 2 ? '#B85450' : val === 3 ? '#E8C547' : '#7BA05B';
                                              return (
                                                <button key={val} className="rating-btn"
                                                  onClick={() => setRating(skill.id, qIdx, val, skill.questions.length)}
                                                  style={{
                                                    width: 36, height: 36, borderRadius: 8,
                                                    border: `2px solid ${isActive ? valColor : '#E5E7EB'}`,
                                                    background: isActive ? valColor : 'white',
                                                    color: isActive ? 'white' : '#6B7280',
                                                    fontWeight: 700, fontSize: 14, cursor: 'pointer',
                                                    boxShadow: isActive ? `0 2px 6px ${valColor}50` : 'none'
                                                  }}>
                                                  {val}
                                                </button>
                                              );
                                            })}
                                          </div>
                                          <span style={{ fontSize: 10, color: '#7BA05B', fontWeight: 600, minWidth: 50, textAlign: 'right' }}>
                                            Идеал
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  <button onClick={() => addQuestion(skill.id)} style={{
                                    background: 'transparent',
                                    border: `1.5px dashed ${block.color}`,
                                    color: block.color, padding: '8px 12px',
                                    borderRadius: 6, fontSize: 12, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 4,
                                    width: '100%', justifyContent: 'center', fontWeight: 600
                                  }}>
                                    <Plus size={14} /> Добавить свой вопрос
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="dashboard-print" style={{
          background: 'white', borderRadius: 12, padding: 32,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          height: 'fit-content', position: 'sticky', top: 24,
          maxHeight: 'calc(100vh - 48px)', overflowY: 'auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #E8F0DC 0%, #DCE4F0 100%)',
            margin: -32, marginBottom: 24,
            padding: '32px 32px 24px', borderRadius: '12px 12px 0 0',
            textAlign: 'center'
          }}>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 32, fontWeight: 700, color: '#2C5F7C',
              letterSpacing: '-0.5px', marginBottom: 6
            }}>
              Диагностика
            </div>
            <div style={{ fontSize: 13, color: '#4A6580', maxWidth: 380, margin: '0 auto', lineHeight: 1.5 }}>
              Наша цель — проанализировать способности и зоны роста ребёнка, чтобы максимально раскрыть его потенциал
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr',
            gap: '8px 16px', fontSize: 13, marginBottom: 24, padding: '0 8px'
          }}>
            <div style={{ fontWeight: 700, color: '#2C5F7C' }}>Имя пользователя</div>
            <div>{meta.parent || '—'}</div>
            <div style={{ fontWeight: 700, color: '#2C5F7C' }}>Имя ученика</div>
            <div>{meta.child || '—'}</div>
            <div style={{ fontWeight: 700, color: '#2C5F7C' }}>Возраст ученика</div>
            <div>{meta.age || '—'}</div>
            <div style={{ fontWeight: 700, color: '#2C5F7C' }}>Дата занятия</div>
            <div>{meta.date || '—'}</div>
            <div style={{ fontWeight: 700, color: '#2C5F7C' }}>Преподаватель</div>
            <div>{meta.teacher || '—'}</div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 50px 1fr',
            gap: 12, padding: '8px 8px',
            borderBottom: '2px solid #E8F0DC',
            fontSize: 13, fontWeight: 700, color: '#2C5F7C', marginBottom: 8
          }}>
            <div>Оцениваемые параметры</div>
            <div></div>
            <div>Уровень развития</div>
          </div>

          {dashboardSkills.length === 0 ? (
            <div style={{
              padding: '40px 20px', textAlign: 'center',
              color: '#9CA3AF', fontSize: 13, fontStyle: 'italic',
              background: '#FAFAFA', borderRadius: 8, marginTop: 8
            }}>
              <Sparkles size={28} style={{ opacity: 0.4, marginBottom: 8 }} /><br/>
              Поставьте оценки на вопросы слева — навыки автоматически появятся здесь
            </div>
          ) : (
            dashboardSkills.map(skill => {
              const pct = skill.percent;
              const color = getColor(pct);
              const widthPct = pct / 80 * 100;
              return (
                <div key={skill.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr 50px 1fr',
                  gap: 12, alignItems: 'center',
                  padding: '10px 8px', borderBottom: '1px solid #F3F4F6'
                }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#1F2937' }}>{skill.name}</div>
                    {pct < 80 && (
                      <div style={{
                        fontSize: 11, color: color.bar, fontWeight: 600,
                        marginTop: 2, fontStyle: 'italic'
                      }}>
                        {color.label}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: color.bar, textAlign: 'right' }}>
                    {pct}%
                  </div>
                  <div style={{ height: 16, background: '#F0F4EC', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', background: color.bar, borderRadius: 8,
                      width: `${widthPct}%`,
                      transition: 'width 0.5s ease, background 0.3s ease'
                    }} />
                  </div>
                </div>
              );
            })
          )}

          {dashboardSkills.length > 0 && (
            <div style={{
              marginTop: 24, paddingTop: 16,
              borderTop: '1px solid #E5E7EB',
              display: 'flex', gap: 16, justifyContent: 'center',
              fontSize: 11, color: '#6B7280', flexWrap: 'wrap'
            }}>
              <LegendItem color="#B85450" label="0–49% критический уровень" />
              <LegendItem color="#E8C547" label="50–79% отстаёт в развитии" />
              <LegendItem color="#7BA05B" label="80% сильная сторона" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, fullWidth }) {
  return (
    <div style={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A6580', marginBottom: 4 }}>
        {label}
      </label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '8px 10px',
          border: '1px solid #E5E7EB', borderRadius: 6,
          fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box'
        }} />
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 12, height: 12, background: color, borderRadius: 3 }} />
      <span>{label}</span>
    </div>
  );
}

const iconBtn = (bg, color) => ({
  background: bg, color: color, border: 'none',
  borderRadius: 4, width: 28, height: 28, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
});

const iconBtnSmall = {
  background: 'transparent', color: '#9CA3AF',
  border: 'none', cursor: 'pointer', padding: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4
};
