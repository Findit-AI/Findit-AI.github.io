import type { Locale } from '../i18n/runtime';

interface SupportArticleSection {
  title: string;
  points: string[];
}

export interface SupportArticleContent {
  intro: string;
  sections: SupportArticleSection[];
  note?: string;
}

const articleContent: Record<string, { en: SupportArticleContent; zh: SupportArticleContent }> = {
  'quick-start': {
    en: {
      intro: 'Use this checklist to bring your first FinDIT project library online in under thirty minutes.',
      sections: [
        {
          title: 'Before You Index',
          points: [
            'Create one top-level folder for each project or client.',
            'Keep folder names stable; avoid frequent renaming during active indexing.',
            'Confirm external drives are mounted before launching FinDIT.',
          ],
        },
        {
          title: 'Initial Setup',
          points: [
            'Add your footage folders in Settings and start background indexing.',
            'Run a few simple test queries to validate search quality for your library.',
            'Enable transcript indexing if dialogue search is part of your workflow.',
          ],
        },
        {
          title: 'First Team Workflow',
          points: [
            'Standardize query conventions (scene, action, location) across teammates.',
            'Define where exported edit lists should be saved for editors.',
            'Document a weekly index health check for larger projects.',
          ],
        },
      ],
      note: 'After setup, continue with All Features to map retrieval capabilities to your production pipeline.',
    },
    zh: {
      intro: '按这份清单操作，你可以在 30 分钟内让首个 FinDIT 项目素材库进入可检索状态。',
      sections: [
        {
          title: '开始索引前',
          points: [
            '按项目或客户建立顶层素材目录，结构先统一。',
            '索引进行期间尽量不要频繁改目录名。',
            '先确认外接硬盘已挂载，再启动 FinDIT。',
          ],
        },
        {
          title: '首次配置',
          points: [
            '在设置中添加素材目录并开启后台索引。',
            '用几条基础查询先验证检索效果。',
            '如需按台词检索，启用转录相关索引流程。',
          ],
        },
        {
          title: '第一条团队流程',
          points: [
            '统一团队查询习惯（场景、动作、地点）。',
            '约定导出编辑清单的落盘位置。',
            '大项目建议每周做一次索引健康检查。',
          ],
        },
      ],
      note: '完成后建议继续阅读功能总览，把检索能力映射到你的制作管线。',
    },
  },
  'video-tutorials': {
    en: {
      intro: 'A practical tutorial sequence for onboarding editors and assistants quickly.',
      sections: [
        {
          title: 'Learning Path',
          points: [
            'Start with folder onboarding and indexing status interpretation.',
            'Move to query design examples for visual and transcript search.',
            'Finish with export handoff to editing tools.',
          ],
        },
        {
          title: 'Practice Drills',
          points: [
            'Use one test project and repeat the same query set weekly.',
            'Compare free-mode and cloud-enhanced semantic query quality.',
            'Log failed queries to improve team search prompts.',
          ],
        },
      ],
      note: 'Keep tutorials tied to real delivery milestones, not generic feature tours.',
    },
    zh: {
      intro: '这是给剪辑师和助理快速上手的实战视频路径。',
      sections: [
        {
          title: '学习顺序',
          points: [
            '先看素材接入与索引状态判断。',
            '再看视觉检索与台词检索的查询写法。',
            '最后看结果导出到剪辑软件的交接流程。',
          ],
        },
        {
          title: '实操建议',
          points: [
            '固定一个测试项目，每周复跑同一组查询。',
            '对比免费模式与云端增强模式下的语义差异。',
            '把失败查询记录下来，迭代团队查询模板。',
          ],
        },
      ],
      note: '建议围绕真实交付节点学习，而不是只看功能演示。',
    },
  },
  'all-features': {
    en: {
      intro: 'A practical map of FinDIT capabilities and where each one fits in production.',
      sections: [
        {
          title: 'Search Core',
          points: [
            'Natural language visual search for scene-level retrieval.',
            'Transcript and keyword matching for spoken content lookup.',
            'Image-to-video similarity search for reference-driven discovery.',
          ],
        },
        {
          title: 'Library Operations',
          points: [
            'Portable folder-level indexes that travel with your drives.',
            'Global index for cross-folder and cross-project discovery.',
            'Background processing tuned for active editing environments.',
          ],
        },
        {
          title: 'Downstream Delivery',
          points: [
            'Export results to editor-friendly interchange formats.',
            'Preserve timecode context for faster timeline assembly.',
            'Use support playbooks when query quality drops.',
          ],
        },
      ],
    },
    zh: {
      intro: '这是当前 FinDIT 能力地图，以及它们在制作流程中的落点。',
      sections: [
        {
          title: '检索核心',
          points: [
            '自然语言视觉检索，支持场景级定位。',
            '台词与关键词匹配，快速找对白内容。',
            '以图搜视频，适合参考镜头反查。',
          ],
        },
        {
          title: '素材库运营',
          points: [
            '目录级索引可随硬盘迁移。',
            '全局索引支持跨目录与跨项目检索。',
            '后台索引对剪辑中机器负载更友好。',
          ],
        },
        {
          title: '下游交付',
          points: [
            '结果可导出为剪辑友好格式。',
            '保留时间码上下文，减少时间线重定位。',
            '检索质量下降时可按支持文档排查。',
          ],
        },
      ],
    },
  },
  'what-is-findit': {
    en: {
      intro:
        'FinDIT is a macOS-native retrieval layer for video workflows, helping teams find exact clips from real libraries with natural language.',
      sections: [
        {
          title: 'Who It Is For',
          points: [
            'Independent creators who need speed without cloud lock-in.',
            'Professional editors handling large multi-drive libraries.',
            'Teams that need repeatable search workflows and reliable handoff.',
          ],
        },
        {
          title: 'What Makes It Different',
          points: [
            'Local-first architecture with strong privacy boundaries.',
            'Natural language and transcript retrieval in one workflow.',
            'Portable indexing model designed for real production environments.',
          ],
        },
      ],
    },
    zh: {
      intro: 'FinDIT 是一层 macOS 原生视频检索基础设施，用自然语言帮助团队在真实素材库中快速定位片段。',
      sections: [
        {
          title: '适用对象',
          points: [
            '需要高效率且不想被云端锁定的独立创作者。',
            '管理多硬盘大型素材库的专业剪辑师。',
            '需要稳定检索与协作交接机制的团队。',
          ],
        },
        {
          title: '核心差异',
          points: [
            '本地优先架构，隐私边界清晰。',
            '自然语言检索与台词检索可在同一流程协作。',
            '可迁移索引模型，更贴合真实制作场景。',
          ],
        },
      ],
    },
  },
  'workspace-model': {
    en: {
      intro: 'A FinDIT workspace is a predictable contract between folders, indexes, and handoff conventions.',
      sections: [
        {
          title: 'Recommended Structure',
          points: [
            'One workspace per project or client account.',
            'Consistent folder naming for footage, selects, and exports.',
            'Shared conventions for query phrasing and tagging notes.',
          ],
        },
        {
          title: 'Cross-Device Behavior',
          points: [
            'Folder-level index stays with the media when drives move.',
            'Global search index is rebuilt from available folder indexes.',
            'Offline libraries remain searchable with previously indexed data.',
          ],
        },
      ],
    },
    zh: {
      intro: '在 FinDIT 中，工作区本质上是目录、索引与交接规范之间的稳定契约。',
      sections: [
        {
          title: '推荐结构',
          points: [
            '按项目或客户维度拆分工作区。',
            '统一素材、精选、导出目录命名。',
            '团队统一查询写法与标注习惯。',
          ],
        },
        {
          title: '跨设备行为',
          points: [
            '目录级索引会跟随媒体一起移动。',
            '全局索引可基于目录级索引重建。',
            '离线状态下仍可搜索已完成索引的数据。',
          ],
        },
      ],
    },
  },
  'permissions-and-roles': {
    en: {
      intro: 'Role setup should keep indexing stable while allowing collaborative discovery.',
      sections: [
        {
          title: 'Operational Role Split',
          points: [
            'Owners define folder structure and indexing policy.',
            'Editors and assistants focus on query, review, and export.',
            'Support owners maintain troubleshooting and onboarding docs.',
          ],
        },
        {
          title: 'Recommended Controls',
          points: [
            'Limit write access on canonical source folders.',
            'Document approval flow for index resets and bulk moves.',
            'Track policy changes in a shared operations note.',
          ],
        },
      ],
    },
    zh: {
      intro: '角色配置的目标是既保证索引稳定，也保证团队协作效率。',
      sections: [
        {
          title: '运营角色拆分',
          points: [
            'Owner 负责目录结构与索引策略。',
            '剪辑师与助理聚焦检索、审阅与导出。',
            '支持负责人维护排障与 onboarding 文档。',
          ],
        },
        {
          title: '建议控制项',
          points: [
            '限制核心素材目录的写入权限。',
            '索引重置和批量迁移需要审批流程。',
            '策略变更记录到共享运营文档中。',
          ],
        },
      ],
    },
  },
  'plans-and-billing': {
    en: {
      intro: 'FinDIT pricing is intentionally simple: Free keeps baseline retrieval usable, Pro increases cloud enhancement capacity.',
      sections: [
        {
          title: 'Plan Snapshot',
          points: [
            'Free: local indexing and core search, no cloud budget.',
            'Pro: ongoing cloud enhancement with higher monthly budget.',
            'Both tiers keep the same local-first retrieval path.',
          ],
        },
        {
          title: 'When to Upgrade',
          points: [
            'Your team runs many hard semantic queries every day.',
            'You need higher consistency on complex natural-language prompts.',
            'You want predictable cloud budget headroom per month.',
          ],
        },
      ],
    },
    zh: {
      intro: 'FinDIT 的定价刻意保持简洁：Free 保留可用检索底座，Pro 提升云端增强容量。',
      sections: [
        {
          title: '套餐概览',
          points: [
            'Free：本地索引与核心检索，无云端预算。',
            'Pro：持续云端增强与更高月度预算。',
            '两档都保留同一条本地优先检索路径。',
          ],
        },
        {
          title: '何时升级',
          points: [
            '团队每天都有大量复杂语义查询。',
            '你需要更稳定的自然语言匹配质量。',
            '你希望每月有更高可预测的云端预算空间。',
          ],
        },
      ],
    },
  },
  'privacy-and-data': {
    en: {
      intro: 'Privacy is a product boundary, not just a marketing statement.',
      sections: [
        {
          title: 'Local by Default',
          points: [
            'Core indexing and search run on your Mac.',
            'Local libraries remain usable without network connectivity.',
            'Folder-level indexes stay with your media location.',
          ],
        },
        {
          title: 'Cloud-Enhanced Scenarios',
          points: [
            'Cloud calls are tied to plan status and available budget.',
            'Cloud enhancement is additive; local retrieval path remains available.',
            'Teams can define policy for when cloud enhancement is allowed.',
          ],
        },
      ],
    },
    zh: {
      intro: '隐私在 FinDIT 里是产品边界，而不仅是营销文案。',
      sections: [
        {
          title: '默认本地',
          points: [
            '核心索引与检索都在本机完成。',
            '无网络时仍可使用已建立的本地检索能力。',
            '目录级索引跟随素材路径保存。',
          ],
        },
        {
          title: '云端增强场景',
          points: [
            '云端调用由套餐状态与预算共同控制。',
            '云端增强是增量能力，本地检索路径始终存在。',
            '团队可制定云端调用策略与审批规则。',
          ],
        },
      ],
    },
  },
  'supported-formats': {
    en: {
      intro: 'FinDIT targets practical format coverage for real post-production pipelines.',
      sections: [
        {
          title: 'Common Production Formats',
          points: [
            'Mainstream MOV/MP4 workflows are supported.',
            'Additional container support is designed for mixed-source libraries.',
            'Format support expands as decoder capabilities evolve.',
          ],
        },
        {
          title: 'Reliability Tips',
          points: [
            'Keep source files in stable paths during indexing.',
            'Validate one sample batch before large ingest operations.',
            'Use troubleshooting playbooks when decode fallback appears often.',
          ],
        },
      ],
    },
    zh: {
      intro: 'FinDIT 的格式支持目标是满足真实剪辑流程，而不是只覆盖演示样例。',
      sections: [
        {
          title: '常见制作格式',
          points: [
            '主流 MOV/MP4 工作流已覆盖。',
            '针对混合来源素材库，容器兼容持续扩展。',
            '解码能力提升会持续带动格式覆盖提升。',
          ],
        },
        {
          title: '稳定性建议',
          points: [
            '索引期间保持素材路径稳定。',
            '大批量导入前先做一批样本验证。',
            '若频繁触发回退解码，请按排障清单处理。',
          ],
        },
      ],
    },
  },
  'export-to-editors': {
    en: {
      intro: 'Export paths are designed to reduce friction between retrieval and timeline assembly.',
      sections: [
        {
          title: 'Typical Handoff',
          points: [
            'Run queries and shortlist target clips by intent.',
            'Export selected results to editor-compatible interchange formats.',
            'Open in your editor and continue fine-grained timeline work.',
          ],
        },
        {
          title: 'Team Consistency',
          points: [
            'Use shared naming for exported result sets.',
            'Store exports in predictable handoff folders.',
            'Add context notes for why clips were selected.',
          ],
        },
      ],
    },
    zh: {
      intro: '导出链路的目标是减少“检索到时间线”之间的摩擦。',
      sections: [
        {
          title: '典型交接流程',
          points: [
            '先按意图检索并筛选目标片段。',
            '将结果导出为剪辑软件可识别格式。',
            '在剪辑软件中继续精细时间线编排。',
          ],
        },
        {
          title: '团队一致性',
          points: [
            '统一导出集合命名规范。',
            '把导出文件放在固定交接目录。',
            '附上片段入选原因，便于后续复核。',
          ],
        },
      ],
    },
  },
  'search-no-results': {
    en: {
      intro: 'No-result states are usually caused by scope mismatch, not by missing footage.',
      sections: [
        {
          title: 'Quick Checks',
          points: [
            'Confirm the target folders are currently indexed and mounted.',
            'Try simpler noun-action-location query wording.',
            'Remove restrictive filters and test broad search first.',
          ],
        },
        {
          title: 'Recovery Path',
          points: [
            'Rebuild local index only for affected folders.',
            'Compare free local query output before cloud-enhanced query.',
            'Log failing query examples for team pattern updates.',
          ],
        },
      ],
    },
    zh: {
      intro: '“无结果”通常是查询范围不匹配，不一定代表素材缺失。',
      sections: [
        {
          title: '快速检查',
          points: [
            '确认目标目录已索引且已挂载。',
            '先用名词+动作+地点的简化查询。',
            '先取消强过滤条件，做宽检索验证。',
          ],
        },
        {
          title: '恢复路径',
          points: [
            '仅重建受影响目录的本地索引。',
            '先比较本地检索结果，再对比云端增强结果。',
            '记录失败查询，反哺团队查询模板。',
          ],
        },
      ],
    },
  },
  'sync-lag': {
    en: {
      intro: 'Sync lag is often related to queue pressure, storage latency, or unstable mount state.',
      sections: [
        {
          title: 'Diagnosis',
          points: [
            'Check whether large indexing batches are still running.',
            'Verify external drive health and connection stability.',
            'Confirm available disk space for index updates.',
          ],
        },
        {
          title: 'Mitigation',
          points: [
            'Pause non-critical indexing jobs during active edit windows.',
            'Process large libraries in staged batches.',
            'Restart sync services only after verifying mount consistency.',
          ],
        },
      ],
    },
    zh: {
      intro: '同步延迟通常与队列压力、存储时延或挂载状态不稳定有关。',
      sections: [
        {
          title: '诊断步骤',
          points: [
            '确认是否仍在跑大批量索引任务。',
            '检查外接硬盘健康与连接稳定性。',
            '确认索引更新所需磁盘空间充足。',
          ],
        },
        {
          title: '缓解方案',
          points: [
            '在高强度剪辑时段暂停非关键索引任务。',
            '大素材库按批次分段处理。',
            '重启同步流程前先确认挂载状态一致。',
          ],
        },
      ],
    },
  },
  'invite-delivery': {
    en: {
      intro: 'Invite failures are usually policy or sender-configuration issues, not user-side mistakes.',
      sections: [
        {
          title: 'Validate Delivery Path',
          points: [
            'Confirm recipient domain policy allows external invitation emails.',
            'Check sender configuration and DNS records for your mail provider.',
            'Review bounce logs to identify blocked or malformed addresses.',
          ],
        },
        {
          title: 'Fallback',
          points: [
            'Use manual share links for urgent onboarding.',
            'Ask recipients to whitelist your sender domain.',
            'Retry invites after policy updates are confirmed.',
          ],
        },
      ],
    },
    zh: {
      intro: '邀请送达失败通常是策略或发信配置问题，不是成员操作错误。',
      sections: [
        {
          title: '先验证送达链路',
          points: [
            '确认对方域名策略允许外部邀请邮件。',
            '检查发信服务配置与 DNS 记录。',
            '查看退信日志定位被拦截或地址错误。',
          ],
        },
        {
          title: '兜底方案',
          points: [
            '紧急 onboarding 可先用手动分享链接。',
            '让对方将发件域加入白名单。',
            '策略更新确认后再重发邀请。',
          ],
        },
      ],
    },
  },
};

export function getSupportArticleContent(articleId: string, locale: Locale): SupportArticleContent | null {
  const record = articleContent[articleId];
  if (!record) return null;
  return locale === 'zh' ? record.zh : record.en;
}
