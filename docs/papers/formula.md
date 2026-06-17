# 公式汇总

统计范围：`slides/papers` 下的 2022、2023、2024、2025 共 4 套 Power Electronics 主考试卷。

## 卷子给定的公式

- **电感**
  - 来源：[Lec.7 电感](/lectures/lec7#电感)

  $$
  \begin{aligned}
    v_L(t)&=L\dfrac{di_L(t)}{dt},\\
    i_L(t)&=\dfrac{1}{L}\int v_L(t)\,dt,\\
    E_L&=\dfrac{1}{2}Li_L^2
  \end{aligned}
  $$

- **电容**
  - 来源：[Lec.2 电路](/lectures/lec2#电路)

  $$
  \begin{aligned}
    v_C(t)&=\dfrac{1}{C}\int i_C(t)\,dt,\\
    i_C(t)&=C\dfrac{dv_C(t)}{dt},\\
    E_C&=\dfrac{1}{2}Cv_C^2
  \end{aligned}
  $$

- **平均值 / RMS**
  - 来源：[Lec.2 功率和能量](/lectures/lec2#功率和能量)

  $$
  \begin{aligned}
    V_{ave}&=\dfrac{1}{T}\int_0^T v(t)\,dt,\\
    V_{rms}&=\sqrt{\dfrac{1}{T}\int_0^T v^2(t)\,dt}
  \end{aligned}
  $$

- **占空比**
  - 来源：[Lec.7 SMPS](/lectures/lec7#开关模式-dc-dc-变换器-smps)

  $$
    D\equiv\phi=\dfrac{T_{on}}{T_{period}}=\dfrac{T_{on}}{T_{on}+T_{off}}
  $$

- **SPWM 调制比**
  - 来源：[Lec.10 谐波](/lectures/lec10#谐波)

  $$
  \begin{aligned}
    m_a&=\dfrac{\hat V_{control}}{\hat V_{carrier}},\\
    m_f&=\dfrac{f_{carrier}}{f_{control}}
  \end{aligned}
  $$

- **瞬时功率**
  - 来源：[Lec.2 功率和能量](/lectures/lec2#功率和能量), [Lec.13 电机驱动介绍](/lectures/lec13#电机驱动介绍)

  $$
    p(t)=\dfrac{v^2(t)}{R}=i^2(t)R=v(t)i(t)=Fv=\tau\omega
  $$

- **平均功率**
  - 来源：[Lec.2 功率和能量](/lectures/lec2#功率和能量)

  $$
    P=\dfrac{1}{T}\int_0^T v(t)i(t)\,dt=\dfrac{V_{rms}^2}{R}=I_{rms}^2R
  $$

- **二极管反向恢复损耗**
  - 来源：[Lec.4 开关损耗](/lectures/lec4#开关损耗)

  $$
    P_{RR}=Q_{RR}V_{R(blocking)}f_{switching}
  $$

- **MOSFET 开关损耗**
  - 来源：[Lec.3 功率开关损耗](/lectures/lec3#功率开关损耗), [Lec.5 开关损耗](/lectures/lec5#开关损耗)

  $$
    P_{switching}=\dfrac{1}{2}f_{switching}V_{DS(off)}(T_{on}I_{on}+T_{off}I_{off})
  $$

- **热路温升**
  - 来源：[Lec.6 等效热模型](/lectures/lec6#等效热模型)

  $$
    \Delta T=P_{device}\sum\theta_{XY}
  $$

- **瞬态温升近似**
  - 来源：[Lec.6 瞬态热分析](/lectures/lec6#瞬态热分析)

  $$
    \Delta T=\dfrac{\text{power}\times\text{time}}{\text{thermal capacitance}}
  $$

- **结温**
  - 来源：[Lec.6 稳态热分析](/lectures/lec6#稳态热分析)

  $$
    T_j=T_{sink}+P_{device}(\theta_{JC}+\theta_{CS})
  $$

- **三角恒等式**
  - 来源：数学工具，讲义无独立小节

  $$
    \cos2\theta=2\cos^2\theta-1=1-2\sin^2\theta
  $$

- **积分公式**
  - 来源：数学工具，讲义无独立小节

  $$
  \begin{aligned}
    \int\cos(a\theta)\,d\theta=\dfrac{1}{a}\sin(a\theta)+C,\\
    \int\sin(a\theta)\,d\theta=-\dfrac{1}{a}\cos(a\theta)+C
  \end{aligned}
  $$

## 题目用到但公式页没给的公式

这部分只列往年题中实际提到或计算直接需要的公式；有些公式可以由第一部分的基础公式推导，但考试中需要快速识别。

### 波形、整流和相位控制

- **波形因数**
  - 考题：`2023 Q1(a)`, `2024 Q2(e)`, `2025 Q1(a)`
  - 来源：[Lec.2 波形因数](/lectures/lec2#波形因数)

  $$
    FF=\dfrac{V_{rms}}{V_{average}}
  $$

  公式页给 average/RMS 定义，但不给 form factor 比例式。

- **线性锯齿波闭式结果**
  - 考题：`2023 Q1(a)`
  - 来源：[Lec.2 波形因数](/lectures/lec2#波形因数)

  $$
  \begin{aligned}
    V_{ave}=\dfrac{V_m}{2}, \\
    V_{rms}=\dfrac{V_m}{\sqrt3},\quad FF=\dfrac{2}{\sqrt3}
  \end{aligned}
  $$

  对 `0` 到 $V_m$ 的线性锯齿波，不应套正弦全波公式。

- **正弦峰值与 RMS**
  - 考题：`2022 Q1(e)`, `2024 Q1(a)`, `2024 Q2`, `2025 Q1(e)`
  - 来源：[Lec.2 功率和能量](/lectures/lec2#功率和能量)

  $$
  \begin{aligned}
    V_{pk}=\sqrt2 V_{rms},\\
    V_{rms}=\dfrac{V_{pk}}{\sqrt2}
  \end{aligned}
  $$

  RMS 输入换成整流峰值时必用。

- **半波整流平均值 / RMS**
  - 考题：`2025 Q2(c)`
  - 来源：[Lec.4 半波整流器](/lectures/lec4#半波整流器)

  $$
  \begin{aligned}
    V_{DC}&=\dfrac{\hat V}{\pi},\\
    V_{rms}&=\dfrac{\hat V}{2}
  \end{aligned}
  $$

  普通半波结果是 SCR 半波相控公式的 $\alpha=0$ 特例。

- **全波整流 RMS**
  - 考题：`2022 Q2(b)`
  - 来源：[Lec.4 全波整流的均值和有效值](/lectures/lec4#全波整流的均值和有效值)

  $$
    V_{rms}=\dfrac{\hat V}{\sqrt2}
  $$

  绝对值整流不改变平方平均值。

- **半波带电容 PIV**
  - 考题：`2025 Q2(a)`
  - 来源：[Lec.4 平滑输出](/lectures/lec4#平滑输出)

  $$
    PIV\approx V_{C,max}+V_{sec,pk}\approx2V_{sec,pk}-\dfrac{\Delta V_{pp}}{2}
  $$

  带电容时，截止二极管承受电容电压与交流负峰值之差。

- **桥式整流 PIV**
  - 考题：`2022 Q2(a)`, `2023 Q1(e)`, `2024 Q2(d)`
  - 来源：[Lec.4 全桥整流器](/lectures/lec4#全桥整流器)

  $$
    PIV\gtrsim V_{sec,pk}
  $$

  桥式每次两个二极管导通；实际选型按最大二次侧峰值和安全裕量。

- **中心抽头全波 PIV**
  - 考题：`2022 Q1(e)`, `2024 Q1(e)`, `2025 Q1(e)`
  - 来源：[Lec.4 中间抽头整流器](/lectures/lec4#中间抽头整流器)

  $$
    PIV\approx2V_{half,pk}\quad\text{或按输出峰值}\quad PIV\approx2V_{out,pk}+V_F
  $$

  先确认题干给的是半绕组峰值还是总次级峰值；2025 还要考虑二极管压降。

- **电容输入滤波纹波**
  - 考题：`2022 Q2(a,c,d)`, `2023 Q1(d)(i)`, `2024 Q2(a)`, `2025 Q2(a)`
  - 来源：[Lec.4 纹波计算](/lectures/lec4#纹波计算)

  $$
  \begin{aligned}
    \Delta V_{pp}&\approx\dfrac{I_L\Delta t}{C},\\
    V_{DC}&\approx V_{pk}-\dfrac{\Delta V_{pp}}{2}
  \end{aligned}
  $$

  半波 $f_r=f_{line}$，全波 $f_r=2f_{line}$；若题干给 conduction angle 或供电比例，按题干时间算。

- **电容值反推**
  - 考题：`2022 Q2(c)`, `2023 Q1(d)(i)`
  - 来源：[Lec.4 纹波计算](/lectures/lec4#纹波计算)

  $$
    C\approx\dfrac{I_L\Delta t}{\Delta V_{pp}}
  $$

  从允许纹波反推 smoothing capacitance。

- **SCR 半波相控平均值 / RMS**
  - 考题：`2025 Q2(c)(iv)`
  - 来源：[Lec.5 相位控制](/lectures/lec5#相位控制)

  $$
  \begin{aligned}
    V_{ave}&=\dfrac{\hat V}{2\pi}(1+\cos\alpha),\\
    V_{rms}^2&=\dfrac{\hat V^2}{4\pi}\left(\pi-\alpha+\dfrac{1}{2}\sin2\alpha\right)
  \end{aligned}
  $$

  $\alpha$ 代入三角函数时按角度/弧度口径统一。

- **SCR 全波/桥相控平均值 / RMS**
  - 考题：`2023 Q1(c)`, `2024 Q1(a-b)`, `2025 Q1(b)`
  - 来源：[Lec.5 全波控制](/lectures/lec5#全波控制), [Lec.5 晶闸管桥](/lectures/lec5#晶闸管桥)

  $$
  \begin{aligned}
    V_{ave}&=\dfrac{\hat V}{\pi}(1+\cos\alpha),\\
    V_{rms}^2&=\dfrac{\hat V^2}{2\pi}\left(\pi-\alpha+\dfrac{1}{2}\sin2\alpha\right)
  \end{aligned}
  $$

  2024 Q1(a) 明确要求 SCR bridge average；双向 AC 控制若按有符号电压平均可为 0，这里列的是整流/课程阻性模型口径。

### DC-DC、线性电源和损耗

- **线性稳压器效率**
  - 考题：`2022 Q3(i)`
  - 来源：[Lec.7 线性 DC-DC](/lectures/lec7#线性-dc-dc-变换器)

  $$
    \eta_{max}\approx\dfrac{V_o}{V_{in}}
  $$

  理想线性稳压器近似。

- **线性稳压器功耗**
  - 考题：`2022 Q3(i)`, `2024 Q2(b)`
  - 来源：[Lec.7 线性 DC-DC](/lectures/lec7#线性-dc-dc-变换器)

  $$
    P_{reg}=(V_{in}-V_o)I_o
  $$

  最坏工况通常看最高输入和最大负载电流。

- **线性电源最低输入**
  - 考题：`2024 Q2(a-c)`
  - 来源：[Lec.4 稳压](/lectures/lec4#稳压)

  $$
  \begin{aligned}
    V_{C,min}&\ge V_o+V_{dropout},\\
    V_{C,min}&\approx V_{sec,pk}-2V_D-\Delta V_{pp}
  \end{aligned}
  $$

  用于 transformer secondary voltage 和 capacitor voltage rating。

- **变压器调整率**
  - 考题：`2024 Q2(a,c,e)`
  - 来源：[Lec.4 隔离和变压](/lectures/lec4#隔离和变压)

  $$
  \begin{aligned}
    Reg&=\dfrac{V_{NL}-V_{FL}}{V_{NL}},\\
    V_{NL}&=\dfrac{V_{FL}}{1-Reg}
  \end{aligned}
  $$

  还要叠加 mains tolerance 和 transformer efficiency。

- **变压器 VA 额定值**
  - 考题：`2024 Q2(e)`
  - 来源：[Lec.4 波形因数计算](/lectures/lec4#波形因数计算)

  $$
  \begin{aligned}
    I_{AC}&=FF\cdot I_{DC},\\
    VA&\approx V_{secondary,rms} I_{AC}
  \end{aligned}
  $$

  若给效率则 $VA_{xfmr}\approx VA_{load}/\eta$；题干给 30° conduction angle 的 form factor。

- **二极管总损耗**
  - 考题：`2023 Q1(b)`
  - 来源：[Lec.4 二极管损耗](/lectures/lec4#二极管损耗)

  $$
    P_D\approx D V_F I_F+Q_{RR}V_R f_s
  $$

  反向恢复公式页给了；导通损耗和 duty 修正未直接给。

- **MOSFET 导通损耗**
  - 考题：`2023 Q2(c)`
  - 来源：[Lec.5 导通损耗](/lectures/lec5#导通损耗)

  $$
    P_{cond}=I_{rms}^2 R_{DS(on)}
  $$

  题目要求先算 MOSFET 电流 RMS。

- **线性斜坡电流平均值 / RMS**
  - 考题：`2023 Q2(a-b)`
  - 来源：[Lec.2 功率和能量](/lectures/lec2#功率和能量)

  $$
  \begin{aligned}
    I_{avg}&=D\dfrac{I_1+I_2}{2},\\
    I_{rms}&=\sqrt{D\dfrac{I_1^2+I_1I_2+I_2^2}{3}}
  \end{aligned}
  $$

  用于 PWM 期间线性变化的 MOSFET 电流波形。

- **Buck 输出关系**
  - 考题：`2022 Q3(a)`, `2023 Q3(b)`, `2025 Q3(a)(ii-iii)`
  - 来源：[Lec.7 输入输出关系](/lectures/lec7#输入输出关系)

  $$
    V_o=DV_i
  $$

  公式页给 duty，但不给 Buck 输入输出关系。

- **Buck 电感电压**
  - 考题：`2022 Q3(c,e-f,h)`, `2025 Q3(a)(v)`
  - 来源：[Lec.7 输入输出关系](/lectures/lec7#输入输出关系)

  $$
  \begin{aligned}
    \text{开关闭合}\quad v_L&=V_i-V_o,\\
    \text{开关断开}\quad v_L&=-V_o
  \end{aligned}
  $$

  由 KVL 和 $v_L=L di/dt$ 得到。

- **Buck 电感纹波与峰值**
  - 考题：`2022 Q3(e-g)`, `2025 Q3(a)(v-vi)`
  - 来源：[Lec.7 电感电流](/lectures/lec7#电感电流)

  $$
  \begin{aligned}
    \Delta I_L&=\dfrac{(V_i-V_o)DT}{L}=\dfrac{V_o(1-D)T}{L},\\
    I_{L,max/min}&=I_{L,avg}\pm\dfrac{\Delta I_L}{2}
  \end{aligned}
  $$

  理想 Buck 中 $I_{L,avg}=I_o=V_o/R$。

- **Boundary CCM 条件**
  - 考题：`2023 Q3(a,c)`
  - 来源：[Lec.7 电感电流](/lectures/lec7#电感电流)

  $$
  \begin{aligned}
    I_{L,min}&=0,\\
    \Delta I_L&=2I_{L,avg},\\
    L_b&=\dfrac{(1-D)R}{2f_s}
  \end{aligned}
  $$

  用于反推边界连续模式所需电感。

- **Buck-Boost 输出关系**
  - 考题：`2024 Q3(a)(i)`, `2023 Q3(e)`
  - 来源：[Lec.8 输入输出关系](/lectures/lec8#输入输出关系-1)

  $$
    V_o=-\dfrac{D}{1-D}V_i
  $$

  可升降压但不隔离；作为替代方案时要注意输出极性。

- **Flyback 输出关系**
  - 考题：`2024 Q3(a)(ii)`, `2025 Q3(b)`
  - 来源：[Lec.9 输入输出关系](/lectures/lec9#输入输出关系)

  $$
    V_o=V_i\dfrac{D}{1-D}\dfrac{N_2}{N_1}
  $$

  需要输入输出电气隔离时优先指向 Flyback。

### 缓冲电路、热设计和逆变器

- **LC 振铃频率**
  - 考题：`2022 Q4(b)(iv)`
  - 来源：[Lec.9 振铃效应](/lectures/lec9#振铃效应)

  $$
    f_o=\dfrac{1}{2\pi\sqrt{L_{stray}C_{oss}}}
  $$

  题目给 MOSFET 输出电容和 PCB 杂散电感。

- **非极性 RC 缓冲设计**
  - 考题：`2024 Q3(b)`
  - 来源：[Lec.9 非极性串联 RC 缓冲电路](/lectures/lec9#非极性串联-rc-缓冲电路)

  $$
  \begin{aligned}
    R_{snub}&\approx\sqrt{\dfrac{L_{stray}}{C_{para}}},\\
    C_{snub}&\approx3C_{para}
  \end{aligned}
  $$

  题目要求选择 snubber 并说明原因。

- **RL 缓冲限流斜率**
  - 考题：`2022 Q4(b)(ii)`, `2024 Q3(b)`
  - 来源：[Lec.9 极性 RL 缓冲电路](/lectures/lec9#极性-rl-缓冲电路-导通缓冲器)

  $$
    \dfrac{di}{dt}=\dfrac{V}{L_s}
  $$

  基础式公式页给出，但题目需要识别为 snubber 应用。

- **缓冲功耗思路**
  - 考题：`2022 Q4(b)(i)`
  - 来源：[Lec.9 缓冲电路](/lectures/lec9#缓冲电路)

  $$
  \begin{aligned}
    P&=I^2R &&\text{(瞬时电阻功耗)},\\
    P&\approx Ef &&\text{(每周期储能耗散)}
  \end{aligned}
  $$

  题意可能按电阻瞬时功耗或每周期储能耗散理解，答题时看题干语境。

- **完整热路链**
  - 考题：`2022 Q4(c)`, `2023 Q1(d)(ii)`
  - 来源：[Lec.6 稳态热分析](/lectures/lec6#稳态热分析)

  $$
    T_j=T_A+P(\theta_{JC}+\theta_{CS}+\theta_{SA})
  $$

  公式页给了局部结温关系，但环境到散热器链路常要自己补全。

- **散热器热阻反推**
  - 考题：`2024 Q1(d)`
  - 来源：[Lec.6 稳态热分析](/lectures/lec6#稳态热分析)

  $$
    \theta_{SA}\le\dfrac{T_{j,max}-T_A}{P}-\theta_{JC}-\theta_{CS}
  $$

  Heatsink sizing 题直接用。

- **Derating 与热阻**
  - 考题：`2024 Q1(d)`
  - 来源：[Lec.6 稳态热分析](/lectures/lec6#稳态热分析)

  $$
    \theta_{JC}\approx\dfrac{1}{\text{derating in W/}^\circ C}
  $$

  题干说明 derating 是 thermal resistance 的另一种规格。

- **共用散热器**
  - 考题：`2025 Q1(d)`
  - 来源：[Lec.6 稳态热分析](/lectures/lec6#稳态热分析)

  $$
  \begin{aligned}
    T_s&=T_A+\bigl(\sum P_i\bigr)\theta_{SA},\\
    T_{j,i}&=T_s+P_i(\theta_{JC,i}+\theta_{CS,i})
  \end{aligned}
  $$

  散热器温升按总功耗算，结温附加项按各器件自身功耗算。

- **三相线电压**
  - 考题：`2023 Q4(a)`, `2024 Q4(a)`
  - 来源：[Lec.12 方波输出](/lectures/lec12#方波输出)

  $$
  \begin{aligned}
    v_{AB}&=v_A-v_B,\\
    v_{BC}&=v_B-v_C,\\
    v_{CA}&=v_C-v_A
  \end{aligned}
  $$

  三相方波状态表和三相 PWM 都要用。

- **三相 PWM 基波关系**
  - 考题：`2023 Q4(a)`
  - 来源：[Lec.12 PWM 输出](/lectures/lec12#pwm-输出), [Lec.12 线电压](/lectures/lec12#线电压)

  $$
  \begin{aligned}
    v_{AN,1}&=\dfrac{m_aV_d}{2}\sin\omega t,\\
    \hat V_{LL,1}&=\dfrac{\sqrt3}{2}m_aV_d
  \end{aligned}
  $$

  2023 要忽略高频谐波求三相线电压。

- **单相全桥 PWM 基波幅值**
  - 考题：`2024 Q4(b)`, `2025 Q4(v)`
  - 来源：[Lec.11 谐波](/lectures/lec11#谐波)

  $$
    (\hat v_o)_1=m_aV_d\quad\text{(线性区单相全桥)}
  $$

  公式页给 $m_a$ 定义，但不给输出基波幅值关系。

- **PWM 谐波位置**
  - 考题：`2025 Q4(v)`
  - 来源：[Lec.11 谐波](/lectures/lec11#谐波)

  $$
  \begin{aligned}
    f_h&=(jm_f\pm k)f_1,\\
    h&=jm_f\pm k
  \end{aligned}
  $$

  公式页给 $m_f$ 定义，但不给边带位置关系。

- **单相全桥双极性 PWM 条件**
  - 考题：`2024 Q4(b)`, `2025 Q4(iii-iv)`
  - 来源：[Lec.11 方波输出和 PWM 输出](/lectures/lec11#方波输出和-pwm-输出)

  $$
  \begin{aligned}
    v_{tri}<v_{control}&\Rightarrow T_{A+},T_{B-}\text{ on},\\
    v_{tri}>v_{control}&\Rightarrow T_{A-},T_{B+}\text{ on}
  \end{aligned}
  $$

  题目直接要求写开关导通条件。

- **单相全桥单极性 PWM 条件**
  - 考题：`2024 Q4(b)`, `2025 Q4(iii-iv)`
  - 来源：[Lec.11 PWM 单极性开关](/lectures/lec11#pwm-单极性开关)

  $$
    \begin{aligned}
      v_{tri}<v_{control}&\Rightarrow T_{A+}\text{ on};\quad v_{tri}>v_{control}\Rightarrow T_{A-}\text{ on}\\
      v_{tri}<-v_{control}&\Rightarrow T_{B+}\text{ on};\quad v_{tri}>-v_{control}\Rightarrow T_{B-}\text{ on}
    \end{aligned}
  $$

  两个桥臂分别比较；输出谐波更容易滤除但控制更复杂。

- **三相 PWM 条件**
  - 考题：`2023 Q4(a)`
  - 来源：[Lec.12 PWM 输出](/lectures/lec12#pwm-输出)

  $$
  \begin{aligned}
    v_{tri}<v_{control,X}&\Rightarrow T_{X+}\text{ on},\\
    \text{否则}&\Rightarrow T_{X-}\text{ on}
  \end{aligned}
  $$

  三个控制信号相差 120°。

- **Shoot-through 防护**
  - 考题：`2023 Q4(e)`
  - 来源：[Lec.10 死区时间](/lectures/lec10#死区时间), [Lec.11 死区时间](/lectures/lec11#死区时间)

  同一桥臂上下管不可同时导通；实际驱动需要 dead time / blanking time。这是开关条件约束，不是公式页内容。
