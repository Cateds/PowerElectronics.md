# 公式汇总

统计范围：`slides/papers` 下的 2022、2023、2024、2025 共 4 套 Power Electronics 主考试卷。

本文分两部分：第一部分是卷面公式页会给出的公式；第二部分是题目计算中会用到、但公式页没有直接给出的公式。2024/2025 的 PDF 文本抽取中公式页排版有粘连，但可辨认为与 2022/2023 同一套公式页。

## 卷子给定的公式

| 公式组             | 公式                                                                              | 对应课程                                                |
| ------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 电感电压-电流关系  | $v_L(t)=L\dfrac{di_L(t)}{dt}$                                                     | [Lec.7 电感](/lectures/lec7#电感)                       |
| 电感电流积分关系   | $i_L(t)=\dfrac{1}{L}\int v_L(t)\,dt$                                              | [Lec.7 电感](/lectures/lec7#电感)                       |
| 电感储能           | $E_L(t)=\dfrac{1}{2}Li_L^2(t)$                                                    | [Lec.2 功率和能量](/lectures/lec2#功率和能量)           |
| 电容电压积分关系   | $v_C(t)=\dfrac{1}{C}\int i_C(t)\,dt$                                              | [Lec.2 电路](/lectures/lec2#电路)                       |
| 电容电流关系       | $i_C(t)=C\dfrac{dv_C(t)}{dt}$                                                     | [Lec.2 电路](/lectures/lec2#电路)                       |
| 电容储能           | $E_C(t)=\dfrac{1}{2}Cv_C^2(t)$                                                    | [Lec.2 功率和能量](/lectures/lec2#功率和能量)           |
| 平均值             | $V_{ave}=\dfrac{1}{T}\int_0^T v(t)\,dt$                                           | [Lec.2 功率和能量](/lectures/lec2#功率和能量)           |
| RMS 值             | $V_{rms}=\sqrt{\dfrac{1}{T}\int_0^T v^2(t)\,dt}$                                  | [Lec.2 功率和能量](/lectures/lec2#功率和能量)           |
| 占空比             | $D\equiv\phi=\dfrac{T_{on}}{T_{period}}=\dfrac{T_{on}}{T_{on}+T_{off}}$           | [Lec.7 SMPS](/lectures/lec7#开关模式-dc-dc-变换器-smps) |
| SPWM 幅度调制比    | $m_a=\dfrac{\hat V_{control}}{\hat V_{carrier}}$                                  | [Lec.10 谐波](/lectures/lec10#谐波)                     |
| SPWM 频率调制比    | $m_f=\dfrac{f_{carrier}}{f_{control}}$                                            | [Lec.12 谐波](/lectures/lec12#谐波)                     |
| 瞬时功率           | $p(t)=\dfrac{v^2(t)}{R}=i^2(t)R=v(t)i(t)$                                         | [Lec.2 功率和能量](/lectures/lec2#功率和能量)           |
| 机械功率类比       | $p=Fv=\tau\omega$                                                                 | [Lec.13 电机驱动介绍](/lectures/lec13#电机驱动介绍)     |
| 平均功率           | $P=\dfrac{1}{T}\int_0^T v(t)i(t)\,dt=\dfrac{V_{rms}^2}{R}=I_{rms}^2R$             | [Lec.2 功率和能量](/lectures/lec2#功率和能量)           |
| 二极管反向恢复损耗 | $P_{RR}=Q_{RR}V_{R(blocking)}f_{switching}$                                       | [Lec.4 开关损耗](/lectures/lec4#开关损耗)               |
| MOSFET 开关损耗    | $P_{switching}=\dfrac{1}{2}f_{switching}V_{DS(off)}(T_{on}I_{on}+T_{off}I_{off})$ | [Lec.3 功率开关损耗](/lectures/lec3#功率开关损耗)       |
| 热路温升           | $\Delta T=P_{device}\sum\theta_{XY}$                                              | [Lec.6 等效热模型](/lectures/lec6#等效热模型)           |
| 瞬态温升近似       | $\Delta T=\dfrac{power\times time}{thermal\ capacitance}$                         | [Lec.6 瞬态热分析](/lectures/lec6#瞬态热分析)           |
| 结温               | $T_{junction}=T_{sink}+P_{device}(\theta_{junction-case}+\theta_{case-sink})$     | [Lec.6 稳态热分析](/lectures/lec6#稳态热分析)           |
| 三角恒等式         | $\cos 2\theta=2\cos^2\theta-1=1-2\sin^2\theta$                                    | 数学工具，讲义无独立小节                                |
| 积分公式           | $\int\cos(a\theta)\,d\theta=\dfrac{1}{a}\sin(a\theta)$                            | 数学工具，讲义无独立小节                                |
| 积分公式           | $\int\sin(a\theta)\,d\theta=-\dfrac{1}{a}\cos(a\theta)$                           | 数学工具，讲义无独立小节                                |

## 题目用到但公式页没给的公式

这部分只列往年题中实际提到或计算直接需要的公式；有些公式可以由第一部分的基础公式推导，但考试中需要快速识别。

### 波形、整流和相位控制

| 公式组                | 公式                                                                                  | 年份/题号                                                   | 对应课程                                                              | 备注                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 波形因数              | $FF=\dfrac{V_{rms}}{V_{average}}$                                                     | `2023 Q1(a)`, `2025 Q1(a)`                                  | [Lec.2 波形因数](/lectures/lec2#波形因数)                             | 公式页给 average/RMS 定义，但不给 form factor 的比例式。                                                              |
| 正弦峰值与 RMS        | $V_{pk}=\sqrt2V_{rms}$，$V_{rms}=\dfrac{V_{pk}}{\sqrt2}$                              | `2022 Q1(e)`, `2024 Q2`, `2025 Q1(e)`                       | [Lec.2 功率和能量](/lectures/lec2#功率和能量)                         | RMS 输入换成整流峰值时必用。                                                                                          |
| 半波整流平均值        | $V_{DC}=\dfrac{\hat V}{\pi}$                                                          | `2025 Q2(c)`                                                | [Lec.4 半波整流器](/lectures/lec4#半波整流器)                         | SCR 半波相控公式的 `\alpha=0` 基础情形。                                                                              |
| 半波整流 RMS          | $V_{rms}=\dfrac{\hat V}{2}$                                                           | `2025 Q2(c)(iv)`                                            | [Lec.4 半波整流器](/lectures/lec4#半波整流器)                         | 公式页只给积分定义，不给半波结果。                                                                                    |
| 全波整流平均值        | $V_{ave}=\dfrac{2\hat V}{\pi}$                                                        | `2023 Q1(a)`, `2024 Q1(a)`, `2024 Q2`, `2025 Q1(e)`         | [Lec.4 全波整流器](/lectures/lec4#全波整流器)                         | 全波、桥式、中心抽头题都会用到。                                                                                      |
| 全波整流 RMS          | $V_{rms}=\dfrac{\hat V}{\sqrt2}$                                                      | `2022 Q2(b)`, `2023 Q1(a)`, `2025 Q2(c)(iv)`                | [Lec.4 全波整流的均值和有效值](/lectures/lec4#全波整流的均值和有效值) | 绝对值整流不改变平方平均值。                                                                                          |
| 半波整流 PIV          | $PIV\ge \hat V_{AC}$                                                                  | `2025 Q2(a-b)`                                              | [Lec.4 半波整流器](/lectures/lec4#半波整流器)                         | 看题图确认峰值是一次侧、二次侧还是变压器变比后的值。                                                                  |
| 桥式整流 PIV          | $PIV\ge \hat V_{secondary}$                                                           | `2023 Q1(e)`, `2024 Q2(d)`                                  | [Lec.4 全桥整流器](/lectures/lec4#全桥整流器)                         | 桥式每次两个二极管导通，但单只二极管 PIV 通常按二次侧峰值看。                                                         |
| 中心抽头全波 PIV      | $PIV\ge 2\hat V_{half-secondary}$                                                     | `2022 Q1(e)`, `2024 Q1(e)`, `2025 Q1(e)`                    | [Lec.4 中间抽头整流器](/lectures/lec4#中间抽头整流器)                 | 若题干给的是总次级峰值，需要先判断半绕组峰值。                                                                        |
| 电容输入滤波纹波      | $\Delta V\approx\dfrac{I_L\Delta t}{C}$                                               | `2022 Q2(a,c)`, `2023 Q1(d)(i)`, `2024 Q2(a)`, `2025 Q2(a)` | [Lec.4 纹波计算](/lectures/lec4#纹波计算)                             | 半波近似 `\Delta t\approx1/f`，全波近似 `\Delta t\approx1/(2f)`；若题干给 conduction angle 或供电比例，按题干时间算。 |
| 电容值反推            | $C\approx\dfrac{I_L\Delta t}{\Delta V}$                                               | `2022 Q2(c)`, `2023 Q1(d)(i)`                               | [Lec.4 纹波计算](/lectures/lec4#纹波计算)                             | 从允许纹波反推 smoothing capacitance。                                                                                |
| SCR 半波相控平均值    | $V_{ave}=\dfrac{\hat V}{2\pi}(1+\cos\alpha)$                                          | `2025 Q2(c)(iv)`                                            | [Lec.5 相位控制](/lectures/lec5#相位控制)                             | `\alpha` 代入三角函数时按角度/弧度口径统一。                                                                          |
| SCR 半波相控 RMS      | $V_{rms}=\hat V\sqrt{\dfrac{1}{4\pi}\left(\pi-\alpha+\dfrac{1}{2}\sin2\alpha\right)}$ | `2025 Q2(c)(iv)`                                            | [Lec.5 相位控制](/lectures/lec5#相位控制)                             | 2025 明确要求 derive and calculate average/RMS。                                                                      |
| SCR 全波/桥相控平均值 | $V_{ave}=\dfrac{\hat V}{\pi}(1+\cos\alpha)$                                           | `2024 Q1(a)`                                                | [Lec.5 晶闸管桥](/lectures/lec5#晶闸管桥)                             | DC motor 的 SCR bridge 题直接问 average voltage as a function of delay angle。                                        |

### DC-DC、线性电源和损耗

| 公式组                 | 公式                                                          | 年份/题号                                        | 对应课程                                             | 备注                                                   |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------ |
| 线性稳压器效率         | $\eta_{max}=\dfrac{V_o}{V_{in}}$                              | `2022 Q3(i)`                                     | [Lec.7 线性 DC-DC](/lectures/lec7#线性-dc-dc-变换器) | 理想线性稳压器近似。                                   |
| 线性稳压器功耗         | $P_{reg}=(V_{in}-V_o)I_o$                                     | `2022 Q3(i)`, `2024 Q2(b)`                       | [Lec.7 线性 DC-DC](/lectures/lec7#线性-dc-dc-变换器) | 最坏工况通常看最高输入和最大负载电流。                 |
| 变压器 VA 额定值       | $VA\approx V_{secondary,rms}I_{load,dc}FF$                    | `2024 Q2(e)`                                     | [Lec.4 波形因数计算](/lectures/lec4#波形因数计算)    | 题干给 30° conduction angle 的 form factor。           |
| 二极管导通损耗         | $P_{cond}=V_FI_FD$                                            | `2023 Q1(b)`                                     | [Lec.4 导通损耗](/lectures/lec4#导通损耗)            | 若只在占空比 `D` 内导通，要乘导通比例。                |
| MOSFET 导通损耗        | $P_{cond}=I_{rms}^2R_{DS(on)}$                                | `2023 Q2(c)`                                     | [Lec.5 导通损耗](/lectures/lec5#导通损耗)            | 题目已要求先算 MOSFET 电流 RMS。                       |
| Buck 输出关系          | $V_o=DV_i$                                                    | `2022 Q3(a)`, `2023 Q3(b)`, `2025 Q3(a)(ii-iii)` | [Lec.7 输入输出关系](/lectures/lec7#输入输出关系)    | 公式页给 duty，但不给 Buck 输入输出关系。              |
| Buck 电感电压          | 开关闭合：$v_L=V_i-V_o$；开关断开：$v_L=-V_o$                 | `2022 Q3(c,e-f,h)`, `2025 Q3(a)(v)`              | [Lec.7 输入输出关系](/lectures/lec7#输入输出关系)    | 由 KVL 和 `v_L=Ldi/dt` 得到。                          |
| Buck 平均电感电流      | $I_{L,avg}=I_o=\dfrac{V_o}{R}$                                | `2022 Q3(d,g)`, `2025 Q3(a)(iv-vi)`              | [Lec.7 电感电流](/lectures/lec7#电感电流)            | 理想 Buck 中电感平均电流等于输出负载电流。             |
| Buck 电感纹波          | $\Delta I_L=\dfrac{(V_i-V_o)t_{on}}{L}=\dfrac{V_ot_{off}}{L}$ | `2022 Q3(e-g)`, `2025 Q3(a)(v-vi)`               | [Lec.7 电感电流](/lectures/lec7#电感电流)            | 充电和放电变化量在稳态下大小相等。                     |
| Buck 最大/最小电感电流 | $I_{L,max/min}=I_{L,avg}\pm\dfrac{\Delta I_L}{2}$             | `2022 Q3(g)`, `2025 Q3(a)(vi)`                   | [Lec.7 电感电流](/lectures/lec7#电感电流)            | 连续模式下最小值仍大于 0。                             |
| Boundary CCM 条件      | $I_{L,min}=0$，边界时 $\Delta I_L=2I_{L,avg}$                 | `2023 Q3(a,c)`                                   | [Lec.7 电感电流](/lectures/lec7#电感电流)            | 用于反推边界连续模式所需电感。                         |
| Buck-Boost 输出关系    | $V_o=-\dfrac{D}{1-D}V_i$                                      | `2024 Q3(a)(i)`, `2025 Q3(b)`                    | [Lec.8 输入输出关系](/lectures/lec8#输入输出关系-1)  | 可升降压但没有电气隔离。                               |
| Boost 输出关系         | $V_o=\dfrac{V_i}{1-D}$                                        | `2023 Q3(e)`                                     | [Lec.8 输入输出关系](/lectures/lec8#输入输出关系)    | 2023 问 “another converter” 时可作为合理替代方案之一。 |
| Flyback 输出关系       | $V_o=V_i\dfrac{D}{1-D}\dfrac{N_2}{N_1}$                       | `2024 Q3(a)(ii)`, `2025 Q3(b)`                   | [Lec.9 输入输出关系](/lectures/lec9#输入输出关系)    | 需要输入输出电气隔离时优先指向 Flyback。               |

### 缓冲电路、热设计和逆变器

| 公式组                  | 公式                                                                                                 | 年份/题号                                    | 对应课程                                                             | 备注                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| LC 振铃频率             | $f_o=\dfrac{1}{2\pi\sqrt{LC}}$                                                                       | `2022 Q4(b)(iv)`                             | [Lec.9 振铃效应](/lectures/lec9#振铃效应)                            | 题目给 MOSFET 输出电容和 PCB 杂散电感。                  |
| RL 缓冲限流斜率         | $\dfrac{di}{dt}=\dfrac{V}{L}$                                                                        | `2022 Q4(b)(ii)`, `2024 Q3(b)`               | [Lec.9 极性 RL 缓冲电路](/lectures/lec9#极性-rl-缓冲电路-导通缓冲器) | 基础式公式页给出，但题目需要识别为 snubber 应用。        |
| 缓冲能量每周期耗散      | $P\approx Ef$，其中 $E_L=\dfrac{1}{2}LI^2$ 或 $E_C=\dfrac{1}{2}CV^2$                                 | `2022 Q4(b)(i)`                              | [Lec.9 缓冲电路](/lectures/lec9#缓冲电路)                            | 公式页给储能式，但不给 snubber 功耗思路。                |
| 散热器热阻反推          | $\theta_{SA}\le\dfrac{T_{j,max}-T_A}{P}-\theta_{JC}-\theta_{CS}$                                     | `2023 Q1(d)(ii)`, `2024 Q1(d)`, `2025 Q1(d)` | [Lec.6 稳态热分析](/lectures/lec6#稳态热分析)                        | 公式页给温升关系，但反推散热器规格需要自己整理。         |
| 三相线电压              | $v_{AB}=v_A-v_B$，$v_{BC}=v_B-v_C$，$v_{CA}=v_C-v_A$                                                 | `2023 Q4(a)`, `2024 Q4(a)`                   | [Lec.12 方波输出](/lectures/lec12#方波输出)                          | 三相方波状态表和三相 PWM 都要用。                        |
| 全桥 PWM 基波幅值       | 线性区单相全桥近似：$(\hat v_o)_1=m_aV_d$                                                            | `2023 Q4(a)`, `2024 Q4(b)`, `2025 Q4(v)`     | [Lec.11 谐波](/lectures/lec11#谐波)                                  | 公式页给 `m_a` 定义，但不给输出基波幅值关系。            |
| PWM 谐波位置            | $f_h=(jm_f\pm k)f_1$                                                                                 | `2025 Q4(v)`, `2023 Q4(a)`                   | [Lec.11 谐波](/lectures/lec11#谐波)                                  | 公式页给 `m_f` 定义，但不给边带位置关系。                |
| 单相全桥双极性 PWM 条件 | $v_{tri}<v_{control}\Rightarrow T_{A+},T_{B-}$ on；$v_{tri}>v_{control}\Rightarrow T_{A-},T_{B+}$ on | `2024 Q4(b)`, `2025 Q4(iii-iv)`              | [Lec.11 方波输出和 PWM 输出](/lectures/lec11#方波输出和-pwm-输出)    | 题目直接要求写开关导通条件。                             |
| 单相全桥单极性 PWM 条件 | A 桥臂比较 $v_{tri}$ 与 $v_{control}$；B 桥臂比较 $v_{tri}$ 与 $-v_{control}$                        | `2024 Q4(b)`, `2025 Q4(iii-iv)`              | [Lec.11 PWM 单极性开关](/lectures/lec11#pwm-单极性开关)              | 重点是两个桥臂分别比较，输出谐波更容易滤除但控制更复杂。 |
| 三相 PWM 条件           | $v_{tri}<v_{control,X}\Rightarrow T_{X+}$ on；否则 $T_{X-}$ on                                       | `2023 Q4(a,e)`                               | [Lec.12 PWM 输出](/lectures/lec12#pwm-输出)                          | 三个控制信号相差 120°。                                  |
