import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

interface LocalChronicle {
  id: string;
  title: string;
  description: string;
}

interface LocalChroniclesProps {
  onBack: () => void;
}

// 统一的外部跳转链接
const COMMON_EXTERNAL_LINK = 'https://pan.baidu.com/s/1ysIRviALvJ9RSYMWjx2QAA?pwd=Q4D7';

const allChronicles: LocalChronicle[] = [
  { id: '1', title: '东牟守城纪略', description: '记录明末登州府东牟守军抗倭与城防细节。' },
  { id: '2', title: '威海卫志', description: '详载明清威海卫所军制、海防与甲午战争遗迹。' },
  { id: '3', title: '靖海卫志', description: '记述靖海卫建置沿革及明代抗倭战役。' },
  { id: '4', title: '续修历城县志', description: '乾隆至清末济南府历城县政区、名宦与泉水专卷。' },
  { id: '5', title: '章邱县乡土志', description: '光绪年间章丘煤铁资源与百业风物汇编。' },
  { id: '6', title: '齐河县志', description: '囊括黄河金堤水利、漕运与齐河兵事纪要。' },
  { id: '7', title: '齐东县乡土志', description: '晚清齐东黄河泛滥、圩田及民俗实录。' },
  { id: '8', title: '利津县志续志', description: '补述咸丰后利津海口盐渔与黄河改道影响。' },
  { id: '9', title: '长清县志', description: '集山川、灵岩寺与泰山余脉胜迹于一编。' },
  { id: '10', title: '泰安州志', description: '旧泰安州辖境祠庙、岱宗封禅与驿站交通总览。' },
  { id: '11', title: '肥城县乡土志', description: '肥城桃、泰山香税与清末团练史料。' },
  { id: '12', title: '阳信县志', description: '阳信棉业、河道与明清乡贤宦绩汇编。' },
  { id: '13', title: '无棣县志', description: '无棣盐场、贝壳堤与明鲁王藩邸纪事。' },
  { id: '14', title: '续修博山县志', description: '博山玻璃陶瓷业、煤矿及孝妇河流域治理。' },
  { id: '15', title: '沾化县志', description: '沾化苇渔盐之利与清末海防炮台布置。' },
  { id: '16', title: '青城县志', description: '高苑青城县黄河堤工、农桑与古迹考。' },
  { id: '17', title: '峰县乡土志', description: '峰县（今枣庄）煤窑、运河与铁道交通初记。' },
  { id: '18', title: '曲阜县志', description: '阙里孔庙祭典、世职奉祀生及衍圣公府档案。' },
  { id: '19', title: '邹县续志', description: '孟庙祀田、峄山摩崖与清末铁路占地始末。' },
  { id: '20', title: '滕县续志稿', description: '滕县煤田、微山湖界址与捻军活动拾遗。' },
  { id: '21', title: '曹州府菏泽县乡土志', description: '牡丹花卉、曹州兵备与黄汛灾赈。' },
  { id: '22', title: '临沂县志', description: '沂州府城、蒙山盗匪与清末教案并记。' },
  { id: '23', title: '续修郊城县志', description: '郯城地震、沂沭河堤与明清漕仓档案。' },
  { id: '24', title: '堂邑县志', description: '运河穿城、东昌府仓储与傅氏家族文献。' },
  { id: '25', title: '茬平县志', description: '茬平黄河故道、驿站与义和团活动调查。' },
  { id: '26', title: '续修清平县志', description: '清平（今临清西）闸漕、砖城与回民史料。' },
  { id: '27', title: '莘县乡土志', description: '莘县粮赋、庙会与清末学务改革纪略。' },
  { id: '28', title: '冠县县志', description: '冠县梨园屯教案、梨园戏班与卫河水利。' },
  { id: '29', title: '定陶县志', description: '曹南古陶丘、汜水河与明清乡贤传。' },
  { id: '30', title: '续修钜野县志', description: '钜野泽变迁、黄河决口与农桑物产表。' },
  { id: '31', title: '郓城县乡土志', description: '郓城水浒遗风、黄河滩区与团练纪实。' },
  { id: '32', title: '民国临清县志光绪莘县志', description: '两县合并本，记临清关榷、运河枢纽。' },
  { id: '33', title: '夏津县志新编', description: '民国初年夏津棉业、教育会与实业局档案。' },
  { id: '34', title: '夏津县志续编', description: '补录民国兵差、兵灾与商会组织。' },
  { id: '35', title: '邱县志', description: '邱县漳卫河堤、盐商与清末自治议会。' },
  { id: '36', title: '德县志', description: '德州卫漕仓、桑园驿与明清漕运禁令。' },
  { id: '37', title: '德州乡土志', description: '德州扒鸡、码头与铁路通车初期风貌。' },
  { id: '38', title: '德平县续志', description: '德平黄河堤工、兵燹与集市兴衰。' },
  { id: '39', title: '馆陶县志', description: '馆陶卫运河闸官、仓廒与明清进士名录。' },
  { id: '40', title: '馆陶县乡土志', description: '乡土教材体例，记农产庙会及风俗。' },
  { id: '41', title: '高唐州乡土志', description: '高唐棉花、书院与义和拳源流。' },
  { id: '42', title: '恩县志', description: '恩城四女寺减河、仓储与兵防旧章。' },
  { id: '43', title: '恩县乡土志', description: '清末恩县小学堂、集市与歌谣调查。' },
  { id: '44', title: '禹城县乡土志', description: '禹城漯川水利、铁路占田与花生种植。' },
  { id: '45', title: '东平县志', description: '东平湖、梁山泊故地与漕运屯田志。' },
  { id: '46', title: '平阴县乡土志', description: '玫瑰之乡、谷城山与黄河滩区民生。' },
  { id: '47', title: '阳谷县志', description: '阳谷运河闸、景阳冈与明清盐枭活动。' },
  { id: '48', title: '商河县志', description: '商河黄河古道、棉业与清代蝗灾记录。' },
  { id: '49', title: '莘县志', description: '再修本详补莘县河渠、书院与人物碑传。' },
  { id: '50', title: '德平县志', description: '明清德平县城池、仓储与黄河堤册。' },
  { id: '51', title: '邹平县志', description: '范公堤、长白书院与邹平实验县资料。' },
  { id: '52', title: '武城县志', description: '卫运河武城段船闸、漕帮与民间花鼓。' },
  { id: '53', title: '齐东县志', description: '齐东迁城始末、黄河口渔业与堤工图说。' },
  { id: '54', title: '东阿县志', description: '阿胶井、运河闸与明清贡胶制度。' },
  { id: '55', title: '民国东阿县志', description: '民国时期东阿矿产、教育及兵差纪实。' },
  { id: '56', title: '续修东阿县志', description: '补录黄河新堤、阿胶专利与实业调查。' },
  { id: '57', title: '长清县志', description: '泰山北麓长清道路、灵岩寺田产与抗日纪略。' },
  { id: '58', title: '日照县志', description: '日照海口、石臼所与民国渔业税则。' },
  { id: '59', title: '平原县志', description: '平原马颊河堤、津浦铁路与农产输出。' },
  { id: '60', title: '文登县志', description: '文登营卫、甲午海战遗迹与天后宫庙会。' },
  { id: '61', title: '长山县志', description: '周村开埠、丝市与长山书院科举名录。' },
  { id: '62', title: '平阴县志', description: '平阴玫瑰、谷城书院与黄河滩区治理。' },
  { id: '63', title: '在平县志', description: '在平县（今茌平）运河、棉业与民国教育。' },
  { id: '64', title: '昌邑县志', description: '昌邑茧绸、盐业与潍河防潮闸工程。' },
  { id: '65', title: '金乡县志', description: '金乡大蒜、羊山战役与明清乡贤录。' },
  { id: '66', title: '即墨县志', description: '即墨老酒、金口港与明清海防营汛。' },
  { id: '67', title: '益都县志', description: '青州府城、云门山与明清藩王庄田。' },
  { id: '68', title: '掖县志', description: '莱州府治所、月季之乡与明清海漕仓。' },
  { id: '69', title: '莒州志', description: '莒国故城、浮来山与沭河水利。' },
  { id: '70', title: '城县志', description: '补阙县域，记城池、兵防与贡赋。' },
  { id: '71', title: '博兴县志', description: '博兴麻大湖、蒲姑国遗址与棉业初兴。' },
  { id: '72', title: '邹县志', description: '再修本补孟庙祭田、峄山书院与碑刻。' },
  { id: '73', title: '寿张县志', description: '寿张黄河堤、梁山泊与运河闸官。' },
  { id: '74', title: '荣成县志', description: '荣成卫所、成山头灯塔与甲午海战。' },
  { id: '75', title: '胶州志', description: '胶澳开埠前胶州湾口岸、海贸与炮台。' },
  { id: '76', title: '诸城县志', description: '诸城恐龙化石、潍河水利与明清乡贤。' },
  { id: '77', title: '诸城县续志', description: '补记民国实业、教育及匪患。' },
  { id: '78', title: '馆陶县志', description: '重辑本，记卫运河漕仓与集市变迁。' },
  { id: '79', title: '济阳县志', description: '济阳黄河堤、津浦铁路与花生种植。' },
  { id: '80', title: '潍县志', description: '潍坊风筝、潍县开埠与胶济铁路史料。' },
  { id: '81', title: '光绪临朐县志', description: '临朐山旺化石、沂山祀典与冶源铁矿。' },
  { id: '82', title: '新城县志', description: '新城（今桓台）马踏湖、渔业与明清进士。' },
  { id: '83', title: '新城县续志', description: '补录民国工商、交通与兵差。' },
  { id: '84', title: '乐陵县志', description: '乐陵枣、马颊河堤与义和团活动。' },
  { id: '85', title: '利津县新志', description: '清末利津海口、盐场与黄河尾闾改道。' },
  { id: '86', title: '利津县志续编', description: '补民国盐税、渔业及水灾赈济。' },
  { id: '87', title: '利津县志补', description: '拾遗碑刻、人物与河口变迁。' },
  { id: '88', title: '登州府志光绪增修', description: '烟台开埠前登州府海防、海运全图。' },
  { id: '89', title: '山东曹州府曹县乡土志光绪', description: '曹县牡丹、黄河险工与兵差徭役。' },
];

const LocalChronicles: React.FC<LocalChroniclesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChronicles = allChronicles.filter(chronicle =>
    chronicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chronicle.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = () => {
    window.open(COMMON_EXTERNAL_LINK, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回主页
          </button>
          <h1 className="text-3xl font-bold text-gray-900">地方志检索解读</h1>
          <p className="text-gray-600 mt-2">探索各地历史文献，了解风土人情</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="搜索地方志名称或简介..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChronicles.length > 0 ? (
            filteredChronicles.map((chronicle) => (
              <div
                key={chronicle.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer p-6"
                onClick={handleCardClick}
              >
                <h3 className="text-xl font-bold mb-2 text-slate-800">{chronicle.title}</h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3">{chronicle.description}</p>
                <button className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  了解详情 →
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">没有找到匹配的地方志。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalChronicles;