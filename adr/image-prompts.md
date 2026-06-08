# 이미지 프롬프트

이미지 생성 프롬프트 가이드
Google AI Studio 사용 기준

각 캐릭터의 기본 프롬프트를 고정하고, 상황별 추가 묘사만 뒤에 붙이세요.
같은 기본 프롬프트를 쓰면 캐릭터 외모 일관성이 유지돼요.
모델은 Imagen 3 또는 Gemini Flash Image 추천.


공통 스타일 고정값 (모든 캐릭터 공통)
style: fantasy romance webtoon illustration, soft cel-shading,
korean manhwa art style, detailed background,
cinematic lighting, high quality, vertical composition

칼리안 (북부대공)
기본 프롬프트 (매번 고정)
semi-realistic fantasy illustration, korean romance novel cover style,
extremely handsome tall young man, broad shoulders, wavy black hair falling over forehead,
sharp intense red eyes, slightly upward gaze, cold dangerous expression,
pale porcelain skin, strong jawline,
black aristocratic noble jacket with intricate silver embroidery,
black leather gloves, dark dramatic atmosphere,
deep dark background, cinematic volumetric lighting, rim light on face,
high detail, high quality, vertical portrait composition, 8k
상황별 추가 묘사
파일명추가 프롬프트kalian-1.jpgstanding alone on stone castle wall at night, looking at dark sky, moonlight, distant cold expressionkalian-2.jpgreaching out hand slightly, forest background at night, torchlight, rare moment of action, protective stancekalian-3.jpgstanding in dimly lit corridor, slightly tired expression, candlelight from window, night, rare vulnerabilitykalian-4.jpgtraining courtyard, holding sword, intense focused expression, sweat, golden hour sunlight, caught off guardkalian-5.jpggrand ballroom background, standing beside the heroine, blocking another person, sharp warning glarekalian-6.jpgsnowy northern landscape outside window, draping coat over someone, rare gentle hand gesture, winter nightkalian-7.jpgstanding in doorway, hesitating, first time showing emotion on face, soft evening light, rare conflicted look

엘리온 (황태자)
기본 프롬프트 (매번 고정)
semi-realistic fantasy illustration, korean romance novel cover style,
extremely handsome tall young man, wavy golden blonde hair with warm highlights,
soft half-lidded gentle eyes (light gold-brown), warm graceful smile,
pale skin with warm peachy undertone, elegant refined features,
white imperial royal jacket with intricate gold embroidery and medallion brooch,
holding champagne glass with ring on finger, relaxed aristocratic pose,
warm candlelight atmosphere, golden amber lighting, soft bokeh background with chandeliers,
warm color palette (ivory, gold, amber, champagne),
soft volumetric warm light on face, high detail, high quality, vertical portrait composition, 8k
상황별 추가 묘사
파일명추가 프롬프트elion-1.jpgpalace garden in spring, approaching with a welcoming smile, cherry blossoms, sunlight, first meeting warmthelion-2.jpgsitting alone in royal library, book in hand, reading quietly, rare unguarded expression, afternoon lightelion-3.jpggrand banquet hall, surrounded by nobles, mid-turn to look at someone across the room, eyes slightly different than usualelion-4.jpgstanding under building eaves in rain, holding umbrella close to share, almost touching shoulders, gentle expressionelion-5.jpgnight palace garden, standing quietly under stars, slightly tired, more honest expression than usual, moonlightelion-6.jpgpalace balcony at night, city lights below, turning to look with unusually serious quiet eyes, emotional momentelion-7.jpgafternoon sunroom, forcing a smile, but eyes not smiling, internal conflict barely showing through composure

시온 (공작)
기본 프롬프트 (매번 고정)
semi-realistic fantasy illustration, korean romance novel cover style,
extremely handsome young man, wavy tousled dark brown hair with warm highlights,
bright mischievous eyes (light grey-blue), playful smirk, slightly raised eyebrow,
charming boyish expression, warm skin tone, no glasses,
dark noble jacket with intricate gold details, white lace cravat shirt, gold brooch chain,
dark leather gloves, relaxed confident posture, leaning slightly forward,
warm candlelight background, soft golden-brown lighting, bokeh candle ambiance,
warm color palette (dark brown, gold, ivory, amber),
soft warm light on face, high detail, high quality, vertical portrait composition, 8k
상황별 추가 묘사
파일명추가 프롬프트sion-1.jpgrunning toward someone with a big bright grin, outdoor courtyard, sunny day, carefree energy, arms slightly opension-2.jpgcaught mid-laugh, hand raised in mock surrender, trying to look innocent, sunny street backgroundsion-3.jpgmarketplace background, holding out street food with one hand, not buying his own portion, casual warm smilesion-4.jpgtraining ground, giving orders with sharp focused expression, completely different from usual, caught off guard being watchedsion-5.jpgsitting across a table, unusually quiet, hands wrapped around a cup, looking down, subtle jealous expressionsion-6.jpgsitting side by side on rooftop at night, starry sky, open mouth as if about to say something, hand slightly reachingsion-7.jpggrabbing someone's wrist, serious expression for the first time, evening light, emotional urgency, no trace of usual playfulness

사용 방법

Google AI Studio 접속 → aistudio.google.com
기본 프롬프트 + 상황별 추가 묘사 합쳐서 입력
생성된 이미지 다운로드
파일명 위 표 기준으로 저장
프로젝트 public/images/ 폴더에 넣기

이미지가 마음에 안 들 때 조정 포인트

너무 사실적 → webtoon illustration 강조 추가
캐릭터가 달라 보임 → 기본 프롬프트 앞에 same character as before, 추가
배경이 너무 복잡 → simple background, 추가
표정이 너무 강함 → subtle expression, 추가